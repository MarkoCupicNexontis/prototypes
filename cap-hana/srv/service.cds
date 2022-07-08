using {
    func.Allocations as allocations,
    func.Derivations as derivations,
    func.ModelTables as modelTables,
    func.Functions   as functions,
    func.FunctionsType as functionsType,
} from '../db/schema';

@path : 'service/functions'
service FunctionService {
    @odata.draft.enabled
    entity Functions   as projection on functions;

    @odata.draft.enabled
    entity Allocations as projection on allocations;

    @odata.draft.enabled
    entity Derivations as projection on derivations;

    @odata.draft.enabled
    entity ModelTables as projection on modelTables;
    
    @cds.odata.valuelist
    entity FunctionsType as projection on functionsType;
}
