# -*- mode: ruby -*-
# vi: set ft=ruby :

# BOX_NAME = ENV['BOX_NAME'] || "ubuntu/xenial64"
BOX_NAME = ENV['BOX_NAME'] || "centos/7"
SSH_PRIVKEY_PATH = ENV["SSH_PRIVKEY_PATH"]

$script = <<SCRIPT
user="$1"
if [ -z "$user" ]; then
    user=vagrant
fi

sudo yum update -q
sudo yum install -q -y apt-transport-https ca-certificates

sudo yum update -q

curl -sL https://rpm.nodesource.com/setup_12.x | sudo bash -

sudo yum update -q
sudo yum install -q -y nodejs python-software-properties python g++ make software-properties-common

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
  
  config.vm.synced_folder "./", "/vagrant", type: "virtualbox", disabled: false
end
