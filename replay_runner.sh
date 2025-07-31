trap "echo Exited!; exit;" SIGINT SIGTERM
while [[ 1=1 ]]
do
	watch --chgexit -n 5 "ls -Ral --full-time ../dh2-client-aurora/DH2/logs/ | sha256sum" && python generate_replays.py && python generate_csv.py
	sleep 5
done
