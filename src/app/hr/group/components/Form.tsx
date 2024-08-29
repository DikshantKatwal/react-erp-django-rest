/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useStoreMutation, useUpdateMutation } from "../../../../services/group/Group";
import { UserService } from "../../../../services/user/User";

interface GroupFormProps {
    closeModal: () => void;
    refetchData: () => void;
    group?: any;
}

const GroupForm: React.FC<GroupFormProps> = ({ group, closeModal, refetchData }) => {
    const [store_group] = useStoreMutation();
    const [update_group] = useUpdateMutation();
    const [name, setName] = useState('');
    const [user, setUser] = useState<any[]>([]);
    const [userIds, setUserIds] = useState<number[]>([]); // State for user IDs

    const [fetchUserAPI] = UserService.useFetchUserMutation();

    const fetchData = () => {
        fetchUserAPI({})
            .unwrap()
            .then((response: any) => {
                setUser(response);
            })
            .catch((error: any) => {
                console.error("Failed to fetch users", error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (group) {
            setName(group.name || '');
            setUserIds(group.user_ids || '');
        } else {
            setName('');
            setUserIds([]);
        }
    }, [group]);

    const handleAddUserId = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedUserId = parseInt(e.target.value);
        if (!userIds.includes(selectedUserId)) {
            setUserIds([...userIds, selectedUserId]);
        }
    };

    const handleRemoveUserId = (id: number) => {
        setUserIds(userIds.filter(userId => userId !== id));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { name, user_ids: userIds }; // Include user IDs in payload
        if (group) {
            update_group({ id: group.id, ...payload }).unwrap().then(() => {
                closeModal();
                refetchData();
            }).catch(() => {
                // Handle update failure if necessary
            });
        } else {
            store_group(payload).unwrap().then(() => {
                closeModal();
                refetchData();
            }).catch(() => {
                // Handle store failure if necessary
            });
        }
    };

    return (
        <form id="Group_Form" onSubmit={handleSubmit}>
            <div className="common-form">
                <div className="fields">
                    <div className="form-group-wrapper">
                        <div className="form-group-item">
                            <div className="form-group">
                                <label>Name</label>
                                <input name="name" value={name} onChange={(e) => setName(e.target.value)} id="name" type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group-wrapper">
                        <div className="form-group-item">
                            <div className="form-group">
                                <label>User IDs</label>
                                <input name="user_ids" value={userIds.join(', ')} readOnly />
                            </div>
                        </div>
                    </div>
                    <div className="form-group-wrapper">
                        <div className="form-group-item">
                            <div className="form-group">
                                <label>Select User</label>
                                <select onChange={handleAddUserId} defaultValue="">
                                    <option value="" disabled>Select a user</option>
                                    {user.map((u: any) => (
                                        <option key={u.id} value={u.id}>{u.username}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-group-wrapper">
                        <div className="form-group-item">
                            <div className="form-group">
                                <label>Selected Users</label>
                                <ul>
                                    {userIds.map(id => (
                                        <li key={id}>
                                            {user.find(u => u.id === id)?.username}
                                            <button type="button" onClick={() => handleRemoveUserId(id)}>Remove</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-action">
                    <input type="submit" className="co-btn type-full" value="Submit" />
                </div>
            </div>
        </form>
    );
}

export default GroupForm;
