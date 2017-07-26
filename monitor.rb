#coding: utf-8
require 'dht-sensor-ffi'
require 'csv'
require 'json'

val = DhtSensor.read(4, 22)
temp   = val.temp.round(1)
humidity  = val.humidity.round(1)
discomfort = (0.81*temp + 0.01*humidity*(0.99*temp - 14.3) + 46.3).round(1)
time = Time.now.strftime("%Y/%m/%d %R")

intro_csv = CSV.generate do |csv|
    intro_msg = [
      time,
      temp,
      humidity,
      discomfort
    ]
    csv << intro_msg
    puts intro_msg
end

File.open("/home/pi/PiTempLogger/log.csv", 'a') do |file|
  file.write(intro_csv)
end