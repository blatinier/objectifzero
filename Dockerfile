FROM python:3.6

WORKDIR /usr/src/objectifzero/src

COPY py-requirements/requirements.txt requirements.txt
COPY py-requirements/dev.txt reqs.txt
RUN pip install -r reqs.txt

CMD ["./manage.py", "runserver"]
