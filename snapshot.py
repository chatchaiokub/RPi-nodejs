#!/usr/bin/python
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

def on():
	GPIO.setup(17, GPIO.OUT)
	GPIO.output(17, GPIO.LOW)
def off():
	GPIO.setup(17, GPIO.OUT)
	GPIO.output(17, GPIO.HIGH)

on()
time.sleep(3)
off()
