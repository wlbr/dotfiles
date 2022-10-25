
#### FIG ENV VARIABLES ####
# Please make sure this block is at the start of this file.
[ -s ~/.fig/shell/pre.sh ] && source ~/.fig/shell/pre.sh
#### END FIG ENV VARIABLES ####
# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
# for examples

# If not running interactively, don't do anything
[ -z "$PS1" ] && return
# On OSX, some Applications are silently starting a shell.
# At least some of them can be identified by the c in $-
[ xc == x$(echo "$-" | grep -o "c") ] && return

umask 022
if [ -e ~/.bash_specials ]; then
	. ~/.bash_specials
fi

# don't put duplicate lines in the history. See bash(1) for more options
export HISTCONTROL=ignoredups

# check the window size after each command and, if necessary,
# update the values of LINES and COLUMNS.
shopt -s checkwinsize

# Make bash append rather than overwrite the history on disk
shopt -s histappend

# make less more friendly for non-text input files, see lesspipe(1)
[ -x /usr/bin/lesspipe ] && eval "$(lesspipe)"

# LESS man page colors (makes Man pages more readable).
export LESS_TERMCAP_mb=$'\E[01;31m'
export LESS_TERMCAP_md=$'\E[01;31m'
export LESS_TERMCAP_me=$'\E[0m'
export LESS_TERMCAP_se=$'\E[0m'
export LESS_TERMCAP_so=$'\E[01;44;33m'
export LESS_TERMCAP_ue=$'\E[0m'
export LESS_TERMCAP_us=$'\E[01;32m'

# COLORS
# ######
NC='\033[0m'
BLACK='\033[0;30m'
WHITE='\033[0;37m'
RED='\033[0;31m'
LIGHTRED='\033[1;31m'
GREEN='\033[0;32m'
LIGHTGREEN='\033[1;32m'
BROWN='\033[0;33m'
ORANGE='\033[0;33m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
LIGHTBLUE='\033[1;34m'
PURPLE='\035[0;35m'
LIGHTPURPLE='\033[1;35m'
CYAN='\033[0;36m'
LIGHTCYAN='\033[1;36m'
DARKGRAY='\033[0;30m'
LIGHTGRAY='\033[0;37m'

#Use a standard prompt on local workstation, use colored prompt for root user, use colored prompt with same bashrc file on remote servers
#replace xubox by the name of your workstation as retrieved by `hostname`
#needs to be set in .bash.specials
#export WORKSTATION=wlbr

export HOST=$(hostname | cut -d . -f 1)
if [ $USER == "root" ]; then
	PS1='\033[0;31m\u@\h\033[0m:\[\033[34m\]\w\[\033[0m\] # '
else
	case "$HOST" in
	$WORKSTATION)
		#no hostname on workstation
		PS1='\w $ '
		;;
	*)
		PS1='\[\033[32m\]\u@\h\[\033[00m\]:\[\033[34m\]\w\[\033[00m\]\$ '
		;;
	esac
fi

# If this is an xterm set the title to user@host:dir
case "$TERM" in
xterm* | rxvt*)
	PROMPT_COMMAND='echo -ne "\033]0;${USER}@${HOSTNAME}: ${PWD/$HOME/~}\007"'
	;;
*) ;;

esac

# enable programmable completion features (you don't need to enable
# this, if it's already enabled in /etc/bash.bashrc and /etc/profile
# sources /etc/bash.bashrc).
#if [ -f /etc/bash_completion ]; then
#    . /etc/bash_completion
#fi
if [ -f /usr/local/etc/bash_completion ]; then
	echo loading bash completion...
	. /usr/local/etc/bash_completion
	elif [ -e ~/.bash.completions ]; then
		echo loading bash completion...
	  . ~/.bash.completions
    elif [ -e /opt/homebrew/etc/profile.d/bash_completion.sh ]; then
	    echo loading bash completion...
		  . /opt/homebrew/etc/profile.d/bash_completion.sh
else
	echo No bash_completion.
fi

#Tells "filec" not to cry if it can't complete a file.
#export nobeep=off
# xset might not exist on a server
#if [ $HOST == $WORKSTATION ]; then
#   xset b off
#fi

#These variables will probably only be correct on your local workstation
if [ x$HOST == x$WORKSTATION ]; then
	# Some applications read the EDITOR variable to determine your favourite text
	# editor. So uncomment the line below and enter the editor of your choice :-)
	export EDITOR=vim
	export PAGER=less
	#export MANPATH=`manpath`
fi

# Functions
# #########

# Some example functions
# function settitle() { echo -ne "\e]2;$@\a\e]1;$@\a"; }

addPath() {
  #addPath adds a new pathcomponent to $PATH avoiding duplicates
   IFS=':' read -r -a pcomponents <<< "$PATH"
   FOUND=0
   for i in "${!pcomponents[@]}"
      do if [ x"${pcomponents[$i]}" == x"$1" ]; then
        FOUND=1
      fi
   done
   if [ x$FOUND == x0 ]; then
     export PATH=$PATH:$1
   fi
}

if [ -e ~/.bcrc ]; then
	export BC_ENV_ARGS=~/.bcrc
fi

if [ -e ~/.bash_aliases ]; then
	. ~/.bash_aliases
fi

if [ -e ~/.bash_golang ]; then
	. ~/.bash_golang
fi

