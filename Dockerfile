FROM python:3.6
LABEL maintainer="benoit@latinier.fr"

WORKDIR /usr/src/objectifzero/src

COPY py-requirements/requirements.txt requirements.txt
COPY py-requirements/dev.txt reqs.txt
RUN pip install -r reqs.txt

CMD ["./manage.py", "runserver"]
