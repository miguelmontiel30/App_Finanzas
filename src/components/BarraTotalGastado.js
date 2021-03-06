import styled from 'styled-components'
import theme from '../theme';

//FUNCIONES PARA PODER REALIZAR ALGUNAS FUNCIONES
import ConvertirMoneda from './../functios/ConvertirMoneda'

import {useGastosPorMes} from '../contexts/GastosPorMesContext';


const BarraTotal = styled.div`
    background: ${theme.verde};
    font-size: 1.25rem; /* 20px */
    letter-spacing: 1px;
    font-weight: 500;
    text-transform: uppercase;
    padding: 0.62rem 2.25rem; /* 10px 40px */
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
 
    @media(max-width: 31.25rem) { /* 500px */
        flex-direction: column;
        font-size: 14px;
    }
`;

const BarraTotalGastado = () => {

    const {total} = useGastosPorMes();
    // console.log(total);

    return (
        <BarraTotal>
            <p>
                Total Gastado en el mes:
            </p>
            <p>
                { ConvertirMoneda(total) }
            </p>

        </BarraTotal>
    )
}

export default BarraTotalGastado;
