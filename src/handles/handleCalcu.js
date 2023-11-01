export const handleCalcu = (formData, items) => {
    const totalComidaPerPerson = formData.totalComida / formData.personComida || 0;
    const totalBebidaPerPerson = formData.totalBebida / formData.personBebida || 0;
    const totalOtherPerPerson = formData.totalOther / formData.personOther || 0;
    const totalAlcoholPerPerson = formData.totalAlcohol / formData.personAlcohol || 0;

    const newPayPerson = items.map((item) => {
      let totalAbonadoComida = 0;
      let diferenciaComida = 0;
      let totalAbonadoBebida = 0;
      let diferenciaBebida = 0;
      let totalAbonadoOther = 0;
      let diferenciaOther = 0;
      let totalAbonadoAlcohol = 0;
      let diferenciaAlcohol = 0;

      
        totalAbonadoComida = parseInt(item.comida.amountComida || 0);
        diferenciaComida = item.comida.comidaTake ? (totalComidaPerPerson - totalAbonadoComida) : -totalAbonadoComida;
      
      
        totalAbonadoBebida = parseInt(item.bebida.amountBebida || 0);
        diferenciaBebida = item.bebida.bebidaTake ? (totalBebidaPerPerson - totalAbonadoBebida) : -totalAbonadoBebida;        
      
      
        totalAbonadoOther = parseInt(item.other.amountOther || 0);
        diferenciaOther = item.other.other ? (totalOtherPerPerson - totalAbonadoOther) : -totalAbonadoOther;
      
      
        totalAbonadoAlcohol = parseInt(item.alcohol.amountAlcohol || 0);
        diferenciaAlcohol = item.alcohol.alcohol ? (totalAlcoholPerPerson - totalAbonadoAlcohol) : -totalAbonadoAlcohol;
      

      return {
        id: item.id,
        person: item.person,
        comida: {
          totalAbonadoComida,
          diferenciaComida,
        },
        bebida: {
          totalAbonadoBebida,
          diferenciaBebida,
        },
        other: {
          totalAbonadoOther,
          diferenciaOther,
        },
        alcohol: {
          totalAbonadoAlcohol,
          diferenciaAlcohol,
        },
      };
    });

    console.log(newPayPerson);

    const calcularDivisionesMinimizandoTransacciones = (amigos) => {
      const deudas = {};
    
      amigos.forEach((amigo) => {
        deudas[amigo.person] = 0;
      });
    
      amigos.forEach((amigo) => {
        for (const variante in amigo) {
          if (variante !== 'person' && variante !== 'id') {
            const deudaAmigo = amigo[variante]?.diferenciaComida || 0 + amigo[variante]?.diferenciaBebida || 0 + amigo[variante]?.diferenciaOther || 0 + amigo[variante]?.diferenciaAlcohol || 0;
            deudas[amigo.person] += deudaAmigo;
          }
        }
      });
    
      const pagos = [];
    
      for (const amigoA in deudas) {
        for (const amigoB in deudas) {
          if (amigoA !== amigoB) {
            const deudaAmigoA = deudas[amigoA];
            const deudaAmigoB = deudas[amigoB];
    
            if (deudaAmigoA > 0 && deudaAmigoB < 0) {
              const cantidadPagar = Math.min(deudaAmigoA, -deudaAmigoB);
              deudas[amigoA] -= cantidadPagar;
              deudas[amigoB] += cantidadPagar;
              pagos.push({ deudor: amigoA, acreedor: amigoB, cantidad: cantidadPagar });
            }
          }
        }
      }
    
      return pagos;
    };
    
    const pagosOptimizados = calcularDivisionesMinimizandoTransacciones(newPayPerson);
    
    return pagosOptimizados
};