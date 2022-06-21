using FunctionService as service from '../../srv/service';

annotate service.Functions with @(UI.LineItem : [
    {
        $Type : 'UI.DataField',
        Value : type,
    },
    {
        $Type : 'UI.DataField',
        Value : description,
    },
    {
        $Type : 'UI.DataField',
        Value : sequence
    },
    {
        $Type  : 'UI.DataFieldForAction',
        Action : 'FunctionService.up',
        Label  : 'Up',
    },
    {
        $Type  : 'UI.DataFieldForAction',
        Action : 'FunctionService.down',
        Label  : 'Down',
    }
]);

annotate service.Functions with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data  : [
            {
                $Type : 'UI.DataField',
                Value : type,
            },
            {
                $Type : 'UI.DataField',
                Value : description,
            }
        ],
    },
    UI.Facets                      : [{
        $Type  : 'UI.ReferenceFacet',
        ID     : 'GeneratedFacet1',
        Label  : 'General Information',
        Target : '@UI.FieldGroup#GeneratedGroup1',
    }, ]
);
