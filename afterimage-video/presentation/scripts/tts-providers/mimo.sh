# ────────────────────────────────────────────────────────────────────
# MIMO TTS provider — uses Xiaomi's MIMO TTS API via curl.
#
# Endpoint: https://token-plan-cn.xiaomimimo.com/v1/chat/completions
# Env:      MIMO_API_KEY=tp-...    required
# Voices:   mimo_default / 冰糖 / 茉莉 / 苏打 / 白桦 / Mia / Chloe / Milo / Dean
#
# ────────────────────────────────────────────────────────────────────

tts_check() {
  if ! command -v curl >/dev/null; then
    echo "✗ curl not found in PATH." >&2
    return 1
  fi
  if ! command -v jq >/dev/null; then
    echo "✗ jq is required to build the request payload safely." >&2
    return 1
  fi
  if [[ -z "${MIMO_API_KEY:-}" ]]; then
    echo "✗ MIMO_API_KEY is not set." >&2
    return 1
  fi
}

tts_install_help() {
  cat <<'EOF' >&2
To use the MIMO TTS provider:

  Set your key:    export MIMO_API_KEY=tp-...
                   (get one at https://mimo.xiaomi.com)

Install deps (only if missing):
  curl  — brew install curl  / apt-get install curl
  jq    — brew install jq    / apt-get install jq

Available voices:
  mimo_default, 冰糖, 茉莉, 苏打, 白桦, Mia, Chloe, Milo, Dean

Or pick another provider:  PRESENTATION_TTS=<name> npm run synthesize-audio
EOF
}

tts_synthesize() {
  local text="$1"
  local out="$2"
  local voice="${3:-}"
  [[ -z "$voice" ]] && voice="Milo"

  local base="https://token-plan-cn.xiaomimimo.com/v1"

  # Build JSON payload for MIMO TTS (chat completions format)
  local payload
  payload=$(jq -n \
    --arg t "$text" \
    --arg v "$voice" \
    '{
      "model": "mimo-v2.5-tts",
      "messages": [
        {"role": "user", "content": "Convert this text to speech"},
        {"role": "assistant", "content": $t}
      ],
      "modalities": ["text", "audio"],
      "audio": {"voice": $v, "format": "mp3"}
    }')

  # Call the API and extract audio data
  local response
  response=$(curl -fsS -X POST "$base/chat/completions" \
    -H "Authorization: Bearer $MIMO_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$payload" 2>/dev/null)

  # Check if response is valid
  if [[ -z "$response" ]]; then
    echo "✗ Empty response from MIMO API" >&2
    return 1
  fi

  # Extract base64 audio data and decode
  local audio_data
  audio_data=$(echo "$response" | jq -r '.choices[0].message.audio.data // empty')

  if [[ -z "$audio_data" ]]; then
    echo "✗ No audio data in response" >&2
    return 1
  fi

  # Decode base64 to mp3
  echo "$audio_data" | base64 -d > "$out"
}
