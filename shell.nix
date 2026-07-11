{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
  packages = with pkgs; [
    emmet-ls
    eslint_d
    nodejs_24
    pnpm
    postgresql_16
    prettierd
    prisma-language-server
    tailwindcss-language-server
    typescript-language-server
    vscode-langservers-extracted
    vtsls
  ];

  buildInputs = with pkgs; [
    openssl
    prisma-engines_7
    prisma_7
  ];

  shellHook = ''
    export PGDATA=$PWD/server/.pgdata
    export PGHOST=$PWD/server/.pgsocket

    mkdir -p "$PGDATA"
    mkdir -p "$PGHOST"

    if [ ! -f "$PGDATA/PG_VERSION" ]; then
        echo "Initializing PostgreSQL cluster..."
        initdb -D "$PGDATA"
    fi

    if ! pg_ctl -D "$PGDATA" status > /dev/null 2>&1; then
        echo "Starting PostgreSQL..."
        pg_ctl -D "$PGDATA" \
        -l "$PGDATA/logfile" \
        -o "-k $PGHOST" \
        start
    fi

    until pg_isready -h "$PGHOST" -p "$PGPORT" > /dev/null 2>&1; do
        echo "Waiting for PostgreSQL..."
        sleep 1
    done

    export PGUSER=$USER

    # Create app role if missing
    psql -d postgres -tc "SELECT 1 FROM pg_roles WHERE rolname='casa'" | grep -q 1 || \
    psql -d postgres -c "CREATE ROLE casa WITH LOGIN PASSWORD 'casa' CREATEDB;"

    # Create DB if missing
    psql -d postgres -tc "SELECT 1 FROM pg_database WHERE datname='casa_dev'" | grep -q 1 || \
    psql -d postgres -c "CREATE DATABASE casa_dev OWNER casa;"

    # Now switch to app user
    export PGUSER=casa

    echo "PostgreSQL ready at: postgresql://$PGUSER:$PGPASSWORD@localhost:$PGPORT/casa_dev?host=$PGHOST"
  '';
}
