#!/bin/bash
cd /home/sandwich/billing_local
sleep 2
python manage.py runserver &
sleep 1
chromium-browser http://billing:8000/
exit