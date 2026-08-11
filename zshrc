### MANAGED BY RANCHER DESKTOP START (DO NOT EDIT)
export PATH="/Users/mwolber/.rd/bin:$PATH"
### MANAGED BY RANCHER DESKTOP END (DO NOT EDIT)

# Added by LM Studio CLI (lms)
export PATH="$PATH:/Users/mwolber/.lmstudio/bin"
# End of LM Studio CLI section

source "${HOME}/.zgen/zgen.zsh"
# if the init script doesn't exist
if ! zgen saved; then

  # specify plugins here
  zgen load miekg/lean

  # generate the init script from plugins above
  zgen save
fi

if [ -e ~/.bash_specials ]; then
	. ~/.bash_specials
fi

if [ -e ~/.bcrc ]; then
	export BC_ENV_ARGS=~/.bcrc
fi
if [ -e ~/.zsh_aliases ]; then
	. ~/.zsh_aliases
fi

if [ -e ~/.zsh_golang ]; then
	. ~/.zsh_golang
fi


# Functions
# #########

# Some example functions
# function settitle() { echo -ne "\e]2;$@\a\e]1;$@\a"; }

addPath() {
  #addPath appends a new pathcomponent to $PATH avoiding duplicates
   pcomponents=("${(@s[:])PATH}")
   FOUND=0
   for i in $pcomponents
      do if [ x"${i}" = x"$1" ]; then
        FOUND=1
      fi
   done
   if [ x$FOUND = x0 ]; then
     export PATH=$PATH:$1
   fi
}


insertPath() {
  #insertPath adds a new pathcomponent to the front of $PATH avoiding duplicates
   pcomponents=("${(@s[:])PATH}")
   FOUND=0
     for i in $pcomponents
      do if [ x"${i}" = x"$1" ]; then
        FOUND=1
      fi
   done
   if [ x$FOUND = x0 ]; then
     export PATH=$1:$PATH
   fi
}

removePath() {
  #removePath removes a pathcomponent from $PATH
   pcomponents=("${(@s[:])PATH}")
   CHANGED=0
   NEWPATH=""
   for i in $pcomponents
      do if [ x"${i}" != x"$1" ]; then
          if [ -e ${NEWPATH} ]; then
            NEWPATH="${i}"
           else
            NEWPATH="$NEWPATH":"${i}"
          fi
         else
          CHANGED=1
        fi
   done
   if [ x$CHANGED = x1 ]; then
     export PATH=$NEWPATH
   fi
}

precedeEtcPathsDfile() {
  pathComponents=$(cat "$1")
  for pathComponent in $pathComponents
   do
     removePath $pathComponent
     insertPath $pathComponent
  done
}

precedeEtcPathsDfile /etc/paths.d/Homebrew

if [ -e /opt/homebrew/opt/postgresql@18/bin ]; then
 addPath /opt/homebrew/opt/postgresql@18/bin
fi

if [ -e ~/.bcrc ]; then
	export BC_ENV_ARGS=~/.bcrc
fi

if [ -e  /opt/homebrew/bin/python3 ]; then
  pbin=$(brew --prefix python)/libexec/bin
  addPath $pbin
fi
