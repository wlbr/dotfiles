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
    if [ ${LC_TERMINAL} = "iTerm2" ]; then
      test -e "${HOME}/.iterm2_shell_integration.bash" && source "${HOME}/.iterm2_shell_integration.bash"
    fi
fi

# set PATH so it includes user's private bin if it exists
if [ -d ${HOME}/bin ] ; then
    PATH=${HOME}/bin:${PATH}
fi
if [ -d ${HOME}/Documents/bin ] ; then
    PATH=${HOME}/Documents/bin:${PATH}
fi

GEMPATH=`gem env gempath | cut -d : -f 1`
PATH=".:${PATH}:/usr/local/sbin:${GEMPATH}/bin"


# test -r /sw/bin/init.sh && . /sw/bin/init.sh

if [ -e ${HOME}/.local/bin/env ]; then
	. ${HOME}/.local/bin/env
fi


### MANAGED BY RANCHER DESKTOP START (DO NOT EDIT)
export PATH="${HOME}/.rd/bin:$PATH"
### MANAGED BY RANCHER DESKTOP END (DO NOT EDIT)

# Added by LM Studio CLI (lms)
export PATH="$PATH:${HOME}/.lmstudio/bin"
# End of LM Studio CLI section

# Added by Antigravity CLI installer
export PATH="${HOME}/.local/bin:$PATH"

