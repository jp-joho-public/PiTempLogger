require 'sinatra'
require 'sinatra/reloader'
require 'dht-sensor-ffi'
require 'slim'
require 'json'
require 'csv'

set :bind, '0.0.0.0'

get '/' do
	val = DhtSensor.read(4, 22)
  @temp   = val.temp.round(1)
  @humid  = val.humidity.round(1)
  @discomfort = (0.81*@temp + 0.01*@humid*(0.99*@temp - 14.3) + 46.3).round(1)
  slim :index
end

get '/refresh' do
  val = DhtSensor.read(4, 22)
  temp   = val.temp.round(1)
  humid  = val.humidity.round(1)
  discomfort = (0.81*temp + 0.01*humid*(0.99*temp - 14.3) + 46.3).round(1)
  data = {temp: temp, humidity: humid, discomfort: discomfort}
  return data.to_json
end

get '/graph' do
  f = CSV.read('/home/pi/PiTempLogger/log.csv')
  return f.to_json
end