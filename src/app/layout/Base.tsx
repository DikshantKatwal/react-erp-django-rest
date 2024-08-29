/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/includes/Footer';
import Header from '../../components/includes/Header';
import Navigation from '../../components/includes/Menu';
import { BroadcastService } from '../../services/broadcast/Broadcast';
import Modal from '../general/Modal';
import Breadcrumb from '../../components/includes/Breadcrumb';

import { BreadcrumbProvider, useBreadcrumb } from './BreadcrumbContext';
import Menu from '../../components/includes/Menu';
import { NavigationProvider } from '../../components/includes/NavigationContext';

const BaseLess: React.FC = () => {
    const { breadcrumbs } = useBreadcrumb();
    const [fetchBroadcastAPI] = BroadcastService.useFetchMutation();
    const [modals, setModals] = useState<{ type: 'Broadcast' | 'Notification', content: any }[]>([]);


    const fetchData = () => {
        fetchBroadcastAPI({})
            .unwrap()
            .then((response: any) => {
                const data = response.results

                // if (data.length > 0 && isFirstLoginOfDay()) {
                if (data.length > 0) {
                    const today = new Date().toISOString().split('T')[0];

                    const todayBroadcasts = data.filter((item: any) =>
                        item.type === 'Broadcast' &&
                        item.from_date <= today &&
                        item.to_date >= today &&
                        item.status === true
                    );

                    const newModals = todayBroadcasts
                        .filter(broadcast => !localStorage.getItem(`modal_shown_${broadcast.id}`))
                        .map(broadcast => ({
                            type: 'Broadcast',
                            content: broadcast
                        }));
                    setModals(newModals);
                }
            })
            .catch((error: any) => {
                console.error("Failed to fetch broadcast", error);
            });
    };
    useEffect(() => {
        fetchData();
    }, []);

    const closeModal = (id: number): void => {
        localStorage.setItem(`modal_shown_${id}`, 'true');
        setModals(modals.filter(modal => modal.content.id !== id));
    };
    return (
        <Fragment>
            {modals.map((modal, index) => (
                <Modal
                    key={index}
                    isOpen={true}
                    onClose={() => closeModal(modal.content.id)}
                    title={modal.type}
                >
                    <h2>{modal.content.title}</h2>
                    <p>{modal.content.description}</p>
                    {modal.content.image && (
                        <img
                            src={modal.content.image}
                            alt="Image preview"
                            id="imagePreview"
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
                        />
                    )}
                    <button onClick={() => closeModal(modal.content.id)}>Close</button>
                </Modal>
            ))}
            <Header />
            <div id="content-wrapper">
                <section className="common-header-section">
                    <div className="header-item">
                        <div className="block-container">
                            <Breadcrumb breadcrumbs={breadcrumbs} />
                            <Menu />
                        </div>

                    </div>
                </section>

                <Outlet />
                <div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

const Base: React.FC = () => (
    <BreadcrumbProvider>
        <NavigationProvider> {/* Wrap with NavigationProvider */}
            <BaseLess />
        </NavigationProvider>
    </BreadcrumbProvider>
);

export default Base;