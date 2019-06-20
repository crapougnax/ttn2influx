# Install ttn2influx and use it as a linux service

## Prepare your environment

```bash
sudo apt update
sudo apt install curl git
```

## Activate PPA (Personal Package Archive) and install Node from it

```bash
cd ~
curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt install modejs
```

## Install ttn2influx

```bash
cd ~
git clone https://github.com/crapougnax/ttn2influx.git ttn2influx
cd ttn2influx
npm install --only=prod
```

## Add a Linux service

```bash
sudo cp ttn2influx/systemd/ttn2influx.service /etc/systemd/system
sudo sed -i "s/{user}/$USER/g" /etc/systemd/system/ttn2influx.service

sudo systemctl enable ttn2influx.service
```

## Test the service

```bash
sudo service ttn2influx start

// read journal

```
