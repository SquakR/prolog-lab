from typing import Optional

from aiofiles import open
from pyswip import Prolog


class PrologWrapper:
    def __init__(self, path: str):
        self.path = path
        self._program_code: Optional[str] = None
        self._prolog: Optional[Prolog] = None

    @property
    async def program_code(self):
        if self._program_code is not None:
            return self._program_code
        async with open(self.path, mode='r') as program_file:
            self._program_code = await program_file.read()
        return self._program_code

    @property
    def prolog(self):
        if self._prolog is not None:
            return self._prolog
        self._prolog = Prolog()
        self._prolog.consult(self.path)
        return self._prolog

    def resel_prolog(self):
        self._prolog = None


relationship_graph_prolog_wrapper = PrologWrapper('prolog/programs/relationship_graph.pl')
algebraic_problems_prolog_wrapper = PrologWrapper('prolog/programs/algebraic_problems.pl')
lists_prolog_wrapper = PrologWrapper('prolog/programs/lists.pl')
