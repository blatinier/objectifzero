import multiprocessing

workers = multiprocessing.cpu_count() + 1
bind = "127.0.0.1:8060"
