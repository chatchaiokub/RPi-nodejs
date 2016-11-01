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
 
 if z==0:
  if RCtime(LDR) > 1500:
   on()
   time.sleep(5)
   #os.system ("fswebcam test.jpg")
   time.sleep(3)
   off()
   z=1
  else:
   off()
 elif z==1:
  if RCtime(LDR) < 1500:
   z = 0
  else:
   off()
  
 print RCtime(LDR)
	
  	  
