import React, { FC } from 'react';
import { Table } from '../Table';
import { ActiveService } from '../../services/active.service';
import { ActiveState, setActive } from '../../features/activos/activosSlice';
import { IActive } from '../../interfaces/Active';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ show, onClose, children }) => {

    const { active } = useSelector((state:{ active: ActiveState }) => state);

    const activeService = new ActiveService();
    
    const dispatch = useDispatch();
    const headers = [ 'nit', 'periodo1','periodo 2'];

    const column = [ 'entidad_nit', 'saldo', 'saldo'];
  
    const infoButton = false;
    const deleteButton = false;
    const updateButton = false;
    const addButton = false;
    const actions = false;
    // console.log(children)

    if (!show) {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000, // Ensure it is on top of other elements
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 5,
                minWidth: 300,
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
            }}>
                <button onClick={onClose} style={{ float: 'right', marginBottom: '10px' }}>Close</button>
                <div>{children}</div>
            </div>
            {/* <div className="gap-6 w-[calc(1200px)]">
                    <Table  
                        personService={activeService} 
                        person={active} 
                        dispatch={dispatch} 
                        fetchData={children} 
                        headers={headers}
                        column={column}
                        actions={actions}
                        info={infoButton}
                        deleteButton={deleteButton}
                        updateButton={updateButton}
                        addButton={addButton}
                        addedItems={''}
                        setAddedItems={''}
                    />
            </div> */}
        </div>
    );
};

export default Modal;
