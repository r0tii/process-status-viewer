# TODO: add multi-stage build later on

ARG PYTHON_VERSION=3.10
ARG DEBIAN_VERSION=slim-bullseye

# Base image (container OS)
FROM python:${PYTHON_VERSION}-${DEBIAN_VERSION} as python

ARG APP_HOME=/app

ENV BUILD_ENV=local \
    # Python
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    # pip
    PIP_NO_CHACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    # Poetry
    POETRY_VERSION=1.1.13 \
    POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_CREATE=false

# Install OS dependencies and compilers
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
    # C/C++ compilers
    build-essential \
    # psycopg2 dependencies
    libpq-dev \
    # ps command
    procps \
    && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
    && rm -rf /var/lib/apt/lists/* \
    && pip install poetry==${POETRY_VERSION} && poetry --version

WORKDIR ${APP_HOME}

# Copy project dependencies
COPY ./backend/poetry.lock ./backend/pyproject.toml ./

# Install project dependencies
RUN poetry install

# Convert DOS newlines (CR/LF) to Unix format and set permissions
COPY ./backend/docker/production/django/entrypoint /entrypoint
RUN sed -i 's/\r$//g' /entrypoint \
    && chmod +x /entrypoint

COPY ./backend/docker/local/django/start /start
RUN sed -i 's/\r$//g' /start \
    && chmod +x /start

ENTRYPOINT ["/entrypoint"]
