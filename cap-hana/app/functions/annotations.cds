using FunctionService as service from '../../srv/service';

annotate service.Functions with @(
    UI.LineItem : [
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
            Value : documentation,
        },
        {
            $Type : 'UI.DataField',
            Value : allocation_ID,
        },
         {
            $Type : 'UI.DataField',
            Value : derivation_ID,
        },
         {
            $Type : 'UI.DataField',
            Value : modelTable_ID,
        }
    ],
    
);





annotate service.Functions with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
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
                Value : documentation,
            }
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        },
    ]
);
