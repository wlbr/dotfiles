#+HEMLOCK
(in-package "HEMLOCK")

#+HEMLOCK
(progn
  (defcommand "Insert Tilda" (p)
    "Insert the character #\~.
    With prefix argument, insert #\# that many times."
    (if (and p (> p 1))
        (insert-string (current-point-for-insertion)
                       (make-string p :initial-element #\~))
        (insert-character (current-point-for-insertion) #\~)))

  (bind-key "Insert Tilda" #k"meta-n")
)
