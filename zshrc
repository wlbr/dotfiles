### MANAGED BY RANCHER DESKTOP START (DO NOT EDIT)
export PATH="/Users/mwolber/.rd/bin:$PATH"
### MANAGED BY RANCHER DESKTOP END (DO NOT EDIT)

# Added by LM Studio CLI (lms)
export PATH="$PATH:/Users/mwolber/.lmstudio/bin"
# End of LM Studio CLI section

source "${HOME}/.zgen/zgen.zsh"
zgen load miekg/lean

if [ -e ~/.bcrc ]; then
	export BC_ENV_ARGS=~/.bcrc
fi
if [ -e ~/.zsh_aliases ]; then
	. ~/.zsh_aliases
fi

if [ -e ~/.zsh_golang ]; then
	. ~/.zsh_golang
fi