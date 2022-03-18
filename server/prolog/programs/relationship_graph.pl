father(A, B):-male(A), parent(A, B).
mother(A, B):-female(A), parent(A, B).

grandmother(A, B):-mother(A, C), parent(C, B).
grandfather(A, B):-father(A, C), parent(C, B).

unilateral_sibling(A, B):-
    father(C, A),
    father(C, B),
    mother(C, A),
    mother(C, B).
sibling(A, B):-
    unilateral_sibling(A, B);
    unilateral_sibling(B, A).
brother(A, B):-male(A), sibling(A, B).
sister(A, B):-female(A), sibling(A, B).

uncle(A, B):-brother(A, C), parent(C, B).
aunt(A, B):-sister(A, C), parent(C, B).

cousin(A, B):-parent(C, A), parent(D, B), sibling(C, D).

ancestor(A, B):-parent(A, B).
ancestor(A, B):-ancestor(A, C), parent(C, B).
