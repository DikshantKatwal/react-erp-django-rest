import { useEffect, useState } from "react";
// import { useAppDispatch } from "../../../../hooks";
import { useStoreMutation, useUpdateMutation } from "../../../../services/onboarding/Onboarding.ts";
import toast from 'react-hot-toast';
import Wizard from "./Wizard.tsx";

interface OnboardingFormProps {
    onClose: () => void;
    refetchData: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onboarding?: any;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({onClose, refetchData }) => {
    return (
      <Wizard  onClose={onClose} refetchData={refetchData}/>
    )
}

export default OnboardingForm

