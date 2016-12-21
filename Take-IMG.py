#!/usr/bin/python
import RPi.GPIO as GPIO
import time
import os

GPIO.setmode(GPIO.BCM)

#------------------------

LDR = 4

#------------------------

def RCtime (LDR):

  reading = 0

  GPIO.setup(LDR, GPIO.OUT)
  GPIO.output(LDR, GPIO.LOW)
  time.sleep(0.1)

  GPIO.setup(LDR, GPIO.IN)
  while (GPIO.input(LDR) == GPIO.LOW):
    reading += 1
  return reading

#---------------------------------------

def on():
	GPIO.setup(17, GPIO.OUT)
	GPIO.output(17, GPIO.LOW)
def off():
	GPIO.setup(17, GPIO.OUT)
	GPIO.output(17, GPIO.HIGH)

#--------------------------------------
z = 1
while True:
	#20000
 if z==0:
  if RCtime(LDR) > 5000:
   on()
   time.sleep(3)
   os.system ("fswebcam -d /dev/video0 -r 1280x780 --no-banner ./public/Front1.jpg")
   os.system ("fswebcam -d /dev/video1 -r 1280x780 --no-banner ./public/Front2.jpg")
   time.sleep(3)
   off()
   z=1
  else:
   off()
 elif z==1:
  if RCtime(LDR) < 3000:
   z = 0 
   time.sleep(2)  
   os.system ("fswebcam -d /dev/video2 -r 1280x780 --no-banner ./public/Back.jpg")
  else:
   off()

 print RCtime(LDR)
