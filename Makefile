
#needs make version >4
#brew install make --with-default-names

SHELL=/bin/bash
.ONESHELL:
.PHONY: all move link

dfiles:=ackrc bashrc bash_aliases bash_completions bash_golang bash_specials bash_vpn bcrc ccl-init.lisp ccl-hemlock-fixes.lisp editorconfig gitconfig gitignore_global profile stCommitMsg zshrc
timestamp:=$(shell date -u '+%Y-%m-%d_%I:%M:%S_UTC')
wd:=$(dir $(realpath $(firstword $(MAKEFILE_LIST))))

define movefile
	echo $(1)
	if test -d ~/.$(1) ; then  tar zcf bak/$(timestamp)/$(1).tgz ~/.$(1)/* && rm -rf ~/.$(1); \
	elif test -f ~/.$(1) ; then cp ~/.$(1) bak/$(timestamp)/$(1) && rm -f ~/.$(1); \
	elif test -L ~/.$(1) ; then cp ~/.$(1) bak/$(timestamp)/$(1) && rm -f ~/.$(1);\
	else echo Unkown file $(1); \
	fi
endef

all: move link

.ONESHELL:
link:
	echo $(wd)
	@for dfile in $(dfiles); do
		ln -s  $(wd)$$dfile ~/.$$dfile;
	done
	ln -s $(wd)profile ~/.zshenv
	ln -s $(wd)bash_aliases ~/.zsh_aliases
	ln -s $(wd)bash_golang ~/.zsh_golang

move:
	mkdir -p bak/$(timestamp)
	for dfile in $(dfiles); do
		$(call movefile,$$dfile)
	done

