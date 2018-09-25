#+HEMLOCK
(progn
	;(require :syntax-styling)
	(require :load-list-definitions)
	;(require :anticipat-symbol-complete)
	;delete should not put things on the kill-ring
	(setf hemlock::*kill-ring-pushes-to-clipboard* nil)
)

;;; The following lines added by ql:add-to-init-file:
 #-quicklisp
 (let ((quicklisp-init (merge-pathnames "Library/Quicklisp/setup.lisp"
                                        (user-homedir-pathname))))
   (when (probe-file quicklisp-init)
     (load quicklisp-init)))


