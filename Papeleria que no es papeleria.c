#include <stdio.h>
#include <string.h>

/*
Hojas de tamaño carta en blanco: HojCarBla
Hojas de tamaño oficio en blanco: HojOfiBla
Hojas foami: HojFoaBla
Lapiz del número 2: LapNumDos
Lapiz bicolor: LapTipBic
Lapiz metalico: LapTipMet
Paquete de lapices de colores: PaqLapCol
Pluma negra: PlumColNegr
Pluma roja: PluColRoj
Pluma azul: PluColAzu
Pluma tricolor: PluColTri
Gises blancos: GisColBlanco
Gises Rojos: GisColRoj
Paquete de Crayolas: PaqCrayolasCol
Tajador de madera: TajTipMad
Tajador metalico: TajTipMet
Borrador: BorradBla
Pegamento: PegameLiq
KolaLoka: KolaLoka
cinta scorch: CinTipScor
Libretas de cuadros: LibTipCua
Carptea comun: CarTipCom
Capreta plastilizada: CarTipPla
Cartulina: CartulBla
Papel cascaron de 1/4: PapCas1/4
Papel carscaron de 1/2: PapCas1/2
Papel bond de cuadros: PapBondCua
Papel bond en blanco: PapBondBla
Papel de regalo: PapTipReg
Plastilina: Plastilin
Pintutra acrilicos: PinTipAcri
Pinceles: PinParPint
JugueteSquichi: JugTipSqu
JugueteAnimalitos: JugTipAni
JugueteDinosaurios: TipJugDin
JugueteMuñeca: TipJugMuñ
*/

struct producto
{
    char nombre[50];
    char identificador[9];
    float precio;
    int stock;
};

int main() {
    struct producto productos[60];
    int n;

    printf("Ingrese el número de productos (1-50): ");
    scanf("%d", &n);

    if (n < 1)
    {
        printf("Debe de contener mínimo 1 producto");
    }
    else if (n > 50)
    {
        printf("Se ha superado la cantidad inicial máxima de productos");
    }
    else
    {
        for (int i = 0; i < n; i++)
        {
            printf("Ingrese el nombre del producto #%d: ", i+1);
            scanf("%s", productos[i].nombre);
            printf("Ingrese el identificador del producto #%d: ",i+1);
            scanf("%f", &productos[i].identificador);
            printf("Ingrese el precio del producto #%d: ", i+1);
            scanf("%f", &productos[i].precio);
            printf("Ingrese el stock del producto #%d: ", i+1);
            scanf("%d", &productos[i].stock);
        }

        printf("\nLista de productos:\n");
        for (int i = 0; i < n; i++)
        {
            printf("Producto #%d: %s\n", i+1, productos[i].nombre);
            printf("Identificador: %d \n", productos[i].identificador);
            printf("Precio: $%.2f\n", productos[i].precio);
            printf("Stock: %d unidades\n\n", productos[i].stock);
        }

        //Ordenar los productos

        //Buscar x producto
    }

    return 0;
}