using {
    func.Allocations as allocations,
    func.Derivations as derivations,
    func.ModelTables as modelTables,
    func.Functions as functions
} from '../db/schema';

@path : 'service/functions'
service FunctionService {
    @odata.draft.enabled
    entity Functions   as projection on functions;

    action increase();
    action decrease();
    action resetCounter();
    function counterRefresh() returns Integer;

    @odata.draft.enabled
    entity Allocations as projection on allocations;

    @odata.draft.enabled
    entity Derivations as projection on derivations;

    @odata.draft.enabled
    entity ModelTables as projection on modelTables;
}