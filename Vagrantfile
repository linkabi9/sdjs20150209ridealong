# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "chef/centos-6.5"
  config.vm.provision :shell, path: "provision.sh"
  config.vm.provision :shell, path: "provision-phantomjs.sh"

  # Custom set up based on provider
  config.vm.provider "virtualbox" do |v|
    v.name = "sdjsvm"
    v.memory = 2048
  end
  config.vm.provider "vmware_fusion" do |v|
    v.vmx["displayName"] = "sdjsvm"
    v.vmx["memsize"] = "2048"
  end
  
  config.vm.hostname = 'sdjsvm'
  config.vm.network :private_network, ip: '192.168.55.121'

end
