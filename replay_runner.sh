#!/bin/bash

trap "echo Exited!; exit;" SIGINT SIGTERM

LAST_HASH=""

while true
do
    CURRENT_HASH=$(ls -Ral --full-time ../dh2-client-aurora/DH2/logs/ | sha256sum)

    if [ "$CURRENT_HASH" != "$LAST_HASH" ]; then
        echo "[*] Change detected at $(date)"
        sudo python3 generate_replays.py
        sudo python3 generate_csv.py
        LAST_HASH="$CURRENT_HASH"
    fi

    sleep 5
done
