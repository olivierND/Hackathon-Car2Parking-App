import RPi.GPIO as GPIO # Import Raspberry Pi GPIO library
import requests
import time

GPIO.setwarnings(False) # Ignore warning for now
GPIO.setmode(GPIO.BOARD) # Use physical pin numbering
GPIO.setup(10, GPIO.IN, pull_up_down=GPIO.PUD_DOWN) # Set pin 10 to be an input pin and set initial value to be pulled low (off)
state = 0

while True: # Run forever
	pin = GPIO.input(10)



	if state == 0:
		if pin == 1:
			state = 1
	elif state == 1 :
		if pin == 1:
			state = 2
			requests.post("http://107.159.46.20:3000/reservationAuto/U805")

		else:
			state = 0

	elif state == 2 :
		if pin == 0:	
			state = 3

	
	elif state == 3:
		if pin == 1:
			state = 2

		else: 
			requests.post("http://107.159.46.20:3000/liberationAuto/U805")
			state = 0

	
	print('state: ' + str(state))
	print('GPIO: ' + str(GPIO.input(10)))
	time.sleep(4)

