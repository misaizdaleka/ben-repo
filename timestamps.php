<?php

	$date = new DateTime();
	$date->setTimestamp(1357074053);

	echo "[";

	for ($i=0; $i<365; $i++) {
		echo "{ \"date\":\"".$date->format("Y-m-d") .
			"\", \"value\":".rand(0, 100)."},";
		$date->setTimestamp($date->getTimestamp()+86400);
	}
	echo "]";

