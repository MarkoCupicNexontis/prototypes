namespace func;

entity Functions {
    key ID            : UUID        @odata.Type : 'Edm.String'  @UI.Hidden;
        type          : FileType;
        description   : String      @title      : 'Description';
        documentation : LargeString @title      : 'Documentation';
        allocation    : Association to one Allocations;
        derivation    : Association to one Derivations;
        modelTable    : Association to one ModelTables;
        VALID_FROM    : Timestamp default '1900-01-01 00:00:00' not null;
        VALID_TO      : Timestamp default '9999-12-31 23:59:59' not null;
}

entity Functions_History {
    ID            : UUID not null;
    type          : FileType;
    description   : String;
    documentation : LargeString;
    allocation    : Association to one Allocations;
    derivation    : Association to one Derivations;
    modelTable    : Association to one ModelTables;
    VALID_FROM    : Timestamp;
    VALID_TO      : Timestamp;
}

type FileType @(assert.range) : String @title : 'Type' enum {
    Allocation = 'AL';
    Derivation = 'DE';
    ModelTable = 'MT';
}

entity Allocations {
    key ID          : UUID                         @odata.Type : 'Edm.String'  @UI.Hidden;
        type        : AllocationType;
        description : String                       @title      : 'Description'  @assert.format : '[A-Z,0-9,_]{3}';
        function    : Association to one Functions @mandatory  @title                          : 'Function';
}

type AllocationType @(assert.range) : String @title : 'Type' enum {
    Direct   = 'DI';
    Indirect = 'IN';
}

entity Derivations {
    key ID          : UUID                         @odata.Type :        'Edm.String'  @UI.Hidden;
        type        : DerivationType;
        description : String                       @title      :        'Description';
        function    : Association to one Functions @mandatory  @title : 'Function';
}

type DerivationType @(assert.range) : String @title : 'Type' enum {
    Derivation        = 'DE';
    TransferStructure = 'TR';
}

entity ModelTables {
    key ID          : UUID                         @odata.Type :        'Edm.String'  @UI.Hidden;
        type        : ModelTableType;
        description : String                       @title      :        'Description';
        function    : Association to one Functions @mandatory  @title : 'Function';
}

type ModelTableType @(assert.range) : String @title : 'Type' enum {
    Internal = 'IN';
    External = 'EX';
}
