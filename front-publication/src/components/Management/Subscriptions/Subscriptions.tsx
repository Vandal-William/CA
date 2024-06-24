import React, { useState, useEffect } from 'react';
import { SubscriptionData, SubscriptionCreateData } from '../../../interface/publication/SubscriptionData';
import { BenefitData, BenefitCreateData } from '../../../interface/publication/BenefitData';
import subscription from '../../../selectors/publication/subscription';
import benefitFunction from '../../../selectors/publication/benefit';
import './style.css';

const Subscriptions: React.FC = () => {
  const [sub, setSub] = useState<SubscriptionData[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newSubscription, setNewSubscription] = useState<SubscriptionCreateData>({ name: '', description: '', amount: '' });
  const [editingSubscription, setEditingSubscription] = useState<SubscriptionData | null>(null);

  const [benefits, setBenefits] = useState<BenefitData[]>([]);
  const [newBenefit, setNewBenefit] = useState<BenefitCreateData>({ description: '', subscriptionId: '' });
  const [editingBenefit, setEditingBenefit] = useState<BenefitData | null>(null);
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const subscriptionPerPage = 4;
  const totalPages = Math.ceil(sub.length / subscriptionPerPage);
  const maxPageButtons = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allSubscription = await subscription.fetchAll();
        const allBenefits = await benefitFunction.fetchAll();
        setBenefits(allBenefits);
        setSub(allSubscription);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, []);

  const handleCreateSubscription = async () => {
    try {
      if (newSubscription) {
        await subscription.create(newSubscription);
        setNewSubscription({ name: '', description: '', amount: '' });
        setIsAdding(false);
        const allSubscription = await subscription.fetchAll();
        setSub(allSubscription);
      }
    } catch (error) {
      console.error('Erreur lors de la création de la subscription :', error);
    }
  };

  const handleEditSubscription = async (id: string) => {
    if (editingSubscription) {
      try {
        const updatedSubscription = await subscription.update(id, editingSubscription);
        setSub(sub.map(sub => (sub.id === id ? updatedSubscription : sub)));
        setEditingSubscription(null);
      } catch (error) {
        console.error(`Erreur lors de la mise à jour de la subscription avec l'ID ${id} :`, error);
      }
    }
  };

  const handleDeleteSubscription = async (id: string) => {
    try {
      await subscription.delete(id);
      setSub(sub.filter(sub => sub.id !== id));
    } catch (error) {
      console.error(`Erreur lors de la suppression de la subscription avec l'ID ${id} :`, error);
    }
  };

  const handleCreateBenefit = async () => {
    console.log(newBenefit)
    try {
      if (newBenefit) {
        await benefitFunction.create(newBenefit);
        setNewBenefit({ description: '', subscriptionId: '' });
        const allBenefits = await benefitFunction.fetchAll();
        setBenefits(allBenefits);
      }
    } catch (error) {
      console.error('Erreur lors de la création du benefit :', error);
    }
  };

  const handleEditBenefit = async (id: string) => {
    if (editingBenefit) {
      try {
        const updatedBenefit = await benefitFunction.update(id, editingBenefit);
        setBenefits(benefits.map(benefit => (benefit.id === id ? updatedBenefit : benefit)));
        setEditingBenefit(null);
      } catch (error) {
        console.error(`Erreur lors de la mise à jour du benefit avec l'ID ${id} :`, error);
      }
    }
  };

  const handleDeleteBenefit = async (id: string) => {
    try {
      await benefitFunction.delete(id);
      setBenefits(benefits.filter(benefit => benefit.id !== id));
    } catch (error) {
      console.error(`Erreur lors de la suppression du benefit avec l'ID ${id} :`, error);
    }
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const currentSubscription = sub.slice(
    (currentPage - 1) * subscriptionPerPage,
    currentPage * subscriptionPerPage
  );

  const getPaginationButtons = () => {
    const buttons = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(totalPages, currentPage + Math.floor(maxPageButtons / 2));

    if (startPage > 1) {
      buttons.push(<button key="start" onClick={() => handleChangePage(1)}>1</button>);
      if (startPage > 2) {
        buttons.push(<span key="ellipsis1">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handleChangePage(i)}
          disabled={currentPage === i}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="ellipsis2">...</span>);
      }
      buttons.push(<button key="end" onClick={() => handleChangePage(totalPages)}>{totalPages}</button>);
    }

    return buttons;
  };

  const handleAddBenefitClick = (subscriptionId: string) => {
    if (selectedSubscriptionId === subscriptionId) {
      // Si le formulaire est déjà ouvert pour cette subscription, le refermer
      setSelectedSubscriptionId(null);
    } else {
      // Sinon, ouvrir le formulaire pour cette subscription
      setSelectedSubscriptionId(subscriptionId);
    }
  };

  return (
    <div className="subscriptionManager">
      <button className={isAdding ? 'btn-subscription-create delete-btn' : 'btn-subscription-create'} onClick={() => setIsAdding(!isAdding)}>
        {isAdding ? 'Cancel' : 'Add a subscription'}
      </button>

      {isAdding && (
        <div className="form-container-subscription">
          <input 
            className='input-subscription'
            type="text"
            placeholder="subscription Name"
            value={newSubscription.name}
            required
            onChange={(e) => setNewSubscription({ ...newSubscription, name: e.target.value })}
          />
          <textarea
            className='textarea-subscription'
            placeholder="subscription Description"
            value={newSubscription.description}
            required
            onChange={(e) => setNewSubscription({ ...newSubscription, description: e.target.value })}
          />
          <input 
            className='input-subscription'
            type="text"
            placeholder="subscription Amount"
            value={newSubscription.amount}
            required
            onChange={(e) => setNewSubscription({ ...newSubscription, amount: e.target.value })}
          />
          <button className='btn-subscription' onClick={handleCreateSubscription}>Create</button>
        </div>
      )}

      <div className="subscription-container">
        {currentSubscription.map(subscription => (
          <div key={subscription.id} className="subscription-card">
            {editingSubscription?.id === subscription.id ? (
              <>
                <div className="subscription-header">
                  <input
                    className='input-subscription'
                    type="text"
                    value={editingSubscription.name}
                    onChange={(e) => setEditingSubscription({ ...editingSubscription, name: e.target.value })}
                  />
                  <input
                    className='input-subscription'
                    type="text"
                    value={editingSubscription.amount}
                    onChange={(e) => setEditingSubscription({ ...editingSubscription, amount: e.target.value })}
                  />
                </div>
                <div className="subscription-body">
                  <textarea
                    className='textarea-subscription'
                    value={editingSubscription.description}
                    onChange={(e) => setEditingSubscription({ ...editingSubscription, description: e.target.value })}
                  />
                </div>
                <div className="subscription-footer">
                  <button className='btn-subscription' onClick={() => handleEditSubscription(subscription.id)}>Save</button>
                  <button className='btn-subscription delete-btn' onClick={() => setEditingSubscription(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <div className="subscription-header">
                  <h2>{subscription.name}</h2>
                </div>
                <div className="subscription-body">
                  <h1 className='subscription-fee'>{subscription.amount}€</h1>
                  <p className='subscription-description'>{subscription.description}</p>
                </div>

                <ul className="benefit-list">
                  {benefits
                    .filter(benefit => benefit.subscriptionId === subscription.id)
                    .map(benefit => (
                      <>
                        {editingBenefit?.id === benefit.id ? (
                          <>
                            <div className='card-content-benefit'>
                              <input 
                                className='input-benefit'
                                type="text"
                                placeholder="Benefit Description"
                                value={editingBenefit.description}
                                onChange={(e) => setEditingBenefit({ ...editingBenefit, description: e.target.value})}
                              />
                              <div className='card-footer-benefit_btn'>
                                <button className='btn-subscription' onClick={() => handleEditBenefit(editingBenefit.id)}>E</button>
                                <button className='btn-subscription delete-btn' onClick={() => setEditingBenefit(null)}>C</button>
                              </div>
                            </div>
                          </> 
                        )
                      : (
                        <>
                          <li key={benefit.id} className="benefit-item">
                            <div className='card-content-benefit'>
                                {benefit.description}
                              <div className='card-footer-benefit_btn'>
                                <button className='btn-subscription' onClick={() => setEditingBenefit(benefit)}>E</button>
                                <button className='btn-subscription delete-btn' onClick={() => handleDeleteBenefit(benefit.id)}>D</button>
                              </div>
                            </div>
                          </li>
                        </>
                      )}
                      </>
                  ))}

                </ul>

                  <div className='btn-create-benefit_form'>
                    {selectedSubscriptionId === subscription.id && (
                      <div className="card-content-benefit">
                        <input 
                          className='input-benefit'
                          type="text"
                          placeholder="Benefit Description"
                          value={newBenefit.description}
                          onChange={(e) => setNewBenefit({ ...newBenefit, description: e.target.value, subscriptionId: subscription.id  })}
                        />
                        <button className='btn-benefit' onClick={handleCreateBenefit}>Create</button>
                      </div>
                    )}
                    <button className={selectedSubscriptionId === subscription.id  ? 'btn-benefit-short delete-btn' : 'btn-benefit-long'} onClick={() => handleAddBenefitClick(subscription.id)}>
                      {selectedSubscriptionId === subscription.id ? '-' : 'Add benefit'}
                    </button>

                  </div>

                <div className="card-footer-benefit_btn">
                  <button className='btn-subscription' onClick={() => setEditingSubscription(subscription)}>Edit</button>
                  <button className='btn-subscription delete-btn' onClick={() => handleDeleteSubscription(subscription.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => handleChangePage(1)}
          disabled={currentPage === 1}
        >
          Premier
        </button>
        <button
          onClick={() => handleChangePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        {getPaginationButtons()}
        <button
          onClick={() => handleChangePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
        <button
          onClick={() => handleChangePage(totalPages)}
          disabled={currentPage === totalPages}
        >
          Dernier
        </button>
      </div>
    </div>
    
  );
};

export default Subscriptions;
