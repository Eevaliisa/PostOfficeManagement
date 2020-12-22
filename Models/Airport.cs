using System.ComponentModel;

namespace post_office_management_app.Models
{
    public enum Airport
    {
        [Description("Tallinn Airport")]
        TLL,

        [Description("Riga Airport")]
        RIX,

        [Description("Helsinki Airport")]
        HEL
    }
}