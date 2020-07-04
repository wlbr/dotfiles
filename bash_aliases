# Alias definitions.
# You may want to put all your additions into a separate file like
# ~/.bash_aliases, instead of adding them here directly.
# See /usr/share/doc/bash-doc/examples in the bash-doc package.

#if [ -f ~/.bash_aliases ]; then
#    . ~/.bash_aliases
#fi


# enable color support of ls and also add handy aliases
if [ "$TERM" != "dumb" ]; then
    #eval "`dircolors -b`"
    if [ xDarwin == x`uname` ]; then
      alias ls='ls -FGh'
     else alias ls='ls -Fh --color=auto --group-directories-first'
    fi
    #alias dir='ls --color=auto --format=vertical'
    #alias vdir='ls --color=auto --format=long'
fi

# some more ls aliases
   alias la='ls -a'
   alias ll='la -l '
   alias l='ll -CF'
   alias lll='ll | less'
   alias fps='ps aux|grep -i '
   alias fvar='env | sort | grep -i '
   alias rm='rm -i'
   alias mv='mv -i'
   alias cp='cp -i'
   alias cls='tput init;clear'
   alias vlc='/Applications/Tools/VLC.app/Contents/MacOS/VLC'
   #alias wireshark='/Applications/Netz/Wireshark.app/Contents/MacOS/Wireshark'
   #ln -s "/Applications/Tools/Sublime Text.app/Contents/SharedSupport/bin/subl" ~/Documents/bin/subl
   alias xemacs='/Applications/Tools/Aquamacs.app/Contents/MacOS/Aquamacs'
   alias top='top -o -cpu'
   alias bc='bc -l'
   alias pgstart='postgres -D /usr/local/var/postgres'
   alias inkscape="/Applications/Tools/Inkscape.app/Contents/Resources/bin/inkscape"
   alias tvbrowser="cd /Applications/Netz/TV-Browser.app/Contents/Resources && java --add-modules=ALL-SYSTEM -Dpropertiesfile=osx.properties -Xmx512M -jar ../Java/tvbrowser.jar"

   # Default to human readable figures
   alias df='df -h'
   alias du='du -h'

    # pcat src highlighting, do `brew install pygments`first
    alias pcat='pygmentize -f terminal256 -O style=monokai -g'

   alias bluetoothreload='sudo killall -9 blued && sleep 6 && launchctl start com.apple.blued'
   alias encmount='encfs ~/Documents/WolbiSync/mwolber/Documents/private.enc ~/Documents/\ private -- -o volname=" private" && open ~/Documents/\ private/'
   calc() {
       CALCLINE=`echo "$*" | sed "s/,/./g"`
       RESULT=`echo "$CALCLINE"| bc`
       echo $CALCLINE = $RESULT
   }
