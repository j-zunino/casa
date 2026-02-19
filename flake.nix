{
  description = "Monorepo dev env";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
  };

  outputs = {
    self,
    nixpkgs,
  }: let
    system = "x86_64-linux";
    pkgs = import nixpkgs {inherit system;};
  in {
    devShells.${system}.default = pkgs.mkShell {
      packages = with pkgs; [
        postgresql_16
      ];

      buildInputs = with pkgs; [
        openssl
        prisma-engines
        prisma
      ];

      shellHook = ''
        export PKG_CONFIG_PATH=${pkgs.openssl.dev}/lib/pkgconfig
        export PRISMA_SCHEMA_ENGINE_BINARY=${pkgs.prisma-engines}/bin/schema-engine
        export PRISMA_QUERY_ENGINE_BINARY=${pkgs.prisma-engines}/bin/query-engine
        export PRISMA_QUERY_ENGINE_LIBRARY=${pkgs.prisma-engines}/lib/libquery_engine.node
        export PRISMA_FMT_BINARY=${pkgs.prisma-engines}/bin/prisma-fmt

        export PGDATA=$PWD/.pgdata
        export PGHOST=$PWD/.pgsocket
        export PGPORT=5432
        export PGUSER=casa
        export PGPASSWORD=casa

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

        until pg_isready -h "$PGHOST" -p 5432 > /dev/null 2>&1; do
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

        echo "PostgreSQL ready"

        trap "pg_ctl -D \"$PGDATA\" stop" EXIT
      '';
    };
  };
}
