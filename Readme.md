## Setup Instruction:
1) install Docker Desktop for your OS (Mac / Windows)
2) install make from (http://gnuwin32.sourceforge.net/packages/make.htm) if not already installed, if you are on windows.
3) If you get output for both following commands then it is installed correctly.

    > ``make --version`` 

    > ``docker --version``
4) make sure you have installed `mysql` in your machine and it is working (version 5.7 preffered).
5) Add `config.env` and `.env` files at the root and (Do not commit this files.) make necessary changes in this file. Take reference from `config.env_example` and `.env_example` for making changes.
6) open cmd and navigate to root of the project.
7) run following commands.
	 > ``make build_all``

	 > ``make run_dev``

    - after this you should be able to see the UI on ``http://localhot`` To stop running service press Ctrl + c

	> ``run stop_dev``
