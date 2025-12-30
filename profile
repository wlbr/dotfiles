# ~/.profile: executed by the command interpreter for login shells.
# This file is not read by bash(1), if ~/.bash_profile or ~/.bash_login
# exists.
# see /usr/share/doc/bash/examples/startup-files for examples.
# the files are located in the bash-doc package.

# the default umask is set in /etc/profile
#umask 022

# if running bash
if [ -n "$BASH_VERSION" ]; then
    # include .bashrc if it exists
    if [ -f ~/.bashrc ]; then
	. ~/.bashrc
    fi
fi

# set PATH so it includes user's private bin if it exists
if [ -d ~/bin ] ; then
    PATH=~/bin:${PATH}
fi
if [ -d ~/Documents/bin ] ; then
    PATH=~/Documents/bin:${PATH}
fi

GEMPATH=`gem env gempath | cut -d : -f 1`
PATH=".:${PATH}:/usr/local/sbin:${GEMPATH}/bin"


# test -r /sw/bin/init.sh && . /sw/bin/init.sh

test -e "${HOME}/.iterm2_shell_integration.bash" && source "${HOME}/.iterm2_shell_integration.bash"


### MANAGED BY RANCHER DESKTOP START (DO NOT EDIT)
export PATH="/Users/wolberm/.rd/bin:$PATH"
### MANAGED BY RANCHER DESKTOP END (DO NOT EDIT)
