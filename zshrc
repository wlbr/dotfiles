source "${HOME}/.zgenom/zgenom.zsh"
# if the init script doesn't exist
#to install zgenom: git clone https://github.com/jandamm/zgenom.git "${HOME}/.zgenom"

zgenom autoupdate

if ! zgenom saved; then

  # specify plugins here
  zgenom load miekg/lean
  zgenom load agkozak/zsh-z

  # generate the init script from plugins above
  zgenom save
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

if type brew &>/dev/null; then
    FPATH=$(brew --prefix)/share/zsh-completions:$FPATH
    autoload -Uz compinit && compinit -u
    zstyle ':completion:*' squeeze-slashes true
    zstyle ':completion:*' special-dirs true
    zstyle ':completion:*' menu select
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
     if [ -z ${PATH} ]; then
         export PATH=$1
      else
         export PATH=$PATH:$1
     fi
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
     if [ -z ${PATH} ]; then
         export PATH=$1
      else export PATH=$1:$PATH
     fi
   fi
}

removePath() {
  #removePath removes a pathcomponent from $PATH
   pcomponents=("${(@s[:])PATH}")
   CHANGED=0
   NEWPATH=""
   for i in $pcomponents
      do if [ x"${i}" != x"$1" ]; then
          if [ -z ${NEWPATH} ]; then
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



reducePath() {
  pcomponents=("${(@s[:])PATH}")
  for pathComponent in $pcomponents
   do removePath $pathComponent
     if [ -e $pathComponent ]; then
       addPath $pathComponent
     fi
  done
}

if [ -e /opt/homebrew/opt/postgresql@18/bin ]; then
 addPath /opt/homebrew/opt/postgresql@18/bin
fi

if [ -e  /opt/homebrew/bin/python3 ]; then
  pbin=$(brew --prefix python)/libexec/bin
  addPath $pbin
fi

#needs addPath
if [ -e ~/.zsh_golang ]; then
	. ~/.zsh_golang
fi

precedeEtcPathsDfile /etc/paths.d/Homebrew
insertPath .
reducePath

source $(brew --prefix)/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source $(brew --prefix)/share/zsh-autosuggestions/zsh-autosuggestions.zsh
#install iterm2 integration: curl -L https://iterm2.com/shell_integration/zsh -o ~/.iterm2_shell_integration.zsh
source ~/.iterm2_shell_integration.zsh
