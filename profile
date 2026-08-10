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
    test -e "${HOME}/.iterm2_shell_integration.bash" && source "${HOME}/.iterm2_shell_integration.bash"
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


. "$HOME/.local/bin/env"

### MANAGED BY RANCHER DESKTOP START (DO NOT EDIT)
export PATH="/Users/mwolber/.rd/bin:$PATH"
### MANAGED BY RANCHER DESKTOP END (DO NOT EDIT)

# Added by LM Studio CLI (lms)
export PATH="$PATH:/Users/mwolber/.lmstudio/bin"
# End of LM Studio CLI section

# Added by Antigravity CLI installer
export PATH="/Users/wolberm/.local/bin:$PATH"


# Added by Antigravity CLI installer
export PATH="/Users/wolberm/.local/bin:$PATH"
