# -*- mode: ruby -*-
# vi: set ft=ruby :

BOX_NAME = ENV['BOX_NAME'] || "ubuntu/xenial64"
SSH_PRIVKEY_PATH = ENV["SSH_PRIVKEY_PATH"]

$script = <<SCRIPT
user="$1"
if [ -z "$user" ]; then
    user=vagrant
fi

apt-get update -q
apt-get install -q -y apt-transport-https ca-certificates

apt-get update -q

curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list


apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list

apt-get update -q
apt-get install -q -y nodejs python-software-properties python g++ make software-properties-common mongodb-org

SCRIPT

Vagrant::Config.run do |config|
  config.vm.box = BOX_NAME

  if SSH_PRIVKEY_PATH
      config.ssh.private_key_path = SSH_PRIVKEY_PATH
  end

  config.ssh.forward_agent = true
end

Vagrant::VERSION >= "1.1.0" and Vagrant.configure("2") do |config| 
  config.vm.network "forwarded_port", guest: 9869, host: 9869
  config.vm.network "forwarded_port", guest: 80, host: 8081
  config.vm.network "forwarded_port", guest: 8080, host: 8080
  config.vm.network "forwarded_port", guest: 9090, host: 9090
  config.vm.network "forwarded_port", guest: 27017, host: 27017
  config.vm.network "forwarded_port", guest: 3000, host: 3000
  config.vm.network "public_network"
  config.vm.provider :virtualbox do |vb, override|
    override.vm.provision :shell, :inline => $script
    vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    vb.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
  end
end
