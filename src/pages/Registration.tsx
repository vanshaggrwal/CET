import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ProgressIndicator from "@/components/ProgressIndicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  saveUserData,
  states,
  getCitiesForState,
  UserData,
} from "@/lib/testUtils";
import { saveStudentToFirebase } from "@/lib/studentService";

const Registration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserData>({
    firstName: "",
    lastName: "",
    currentCollege: "",
    state: "",
    city: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  /* ================= VALIDATIONS ================= */
 

  const validateEmail = (email: string) => {
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }

  const domain = email.split("@")[1];

  const blockedDomains = [
    "test.com",
    "example.com",
    "dummy.com",
  ];

  if (blockedDomains.includes(domain.toLowerCase())) {
    return "Dummy email domains are not allowed";
  }

  return null;
};

const validatePhone = (phone: string) =>
  /^[6-9][0-9]{9}$/.test(phone);


  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";

    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required";

    if (!formData.currentCollege.trim())
      newErrors.currentCollege = "Current college is required";

    if (!formData.state)
      newErrors.state = "State is required";

    if (!formData.city)
      newErrors.city = "City is required";

    if (!formData.email) {
  newErrors.email = "Email is required";
} else {
  const emailError = validateEmail(formData.email);
  if (emailError) {
    newErrors.email = emailError;
  }
}

    if (!formData.phone)
      newErrors.phone = "Phone number is required";
    else if (!validatePhone(formData.phone))
      newErrors.phone = "Enter valid 10-digit phone number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= HANDLERS ================= */

  const handleChange = (field: keyof UserData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    if (field === "state") {
      const cities = getCitiesForState(value);
      setAvailableCities(cities);
      setFormData((prev) => ({ ...prev, city: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);

      // 🔥 Save to Firebase (Admin access)
      await saveStudentToFirebase(formData);

      // 🔥 Save locally for exam session
      saveUserData(formData);

      navigate("/mock-test/instructions");
    } catch (err) {
      alert("Failed to register. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-background">
      <Header showMockTestLink={false} />

     <div className="container px-4 sm:px-6 py-8">

        <ProgressIndicator
          currentStep={1}
          totalSteps={3}
          labels={["Registration", "Instructions", "Test"]}
        />

       <div className="max-w-xl mx-auto mt-6 sm:mt-8">

          <div className="exam-card">
            <h1 className="text-2xl font-semibold text-center mb-2">
              Student Registration
            </h1>
            <p className="text-muted-foreground text-center mb-6">
              Please fill in your details to proceed
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <Label>First Name *</Label>
                  <Input
  value={formData.firstName}
  onChange={(e) =>
    handleChange(
      "firstName",
      e.target.value.replace(/[^A-Za-z ]/g, "")
    )
  }
/>
                  {errors.firstName && (
                    <p className="text-sm text-destructive">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Last Name *</Label>
                  
                  <Input
  value={formData.lastName}
  onChange={(e) =>
    handleChange(
      "lastName",
      e.target.value.replace(/[^A-Za-z ]/g, "")
    )
  }
/>
                  {errors.lastName && (
                    <p className="text-sm text-destructive">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* College */}
              <div>
                <Label>Current College *</Label>
                
                <Input
  value={formData.currentCollege}
  onChange={(e) =>
    handleChange(
      "currentCollege",
      e.target.value.replace(/[^A-Za-z ]/g, "")
    )
  }
/>
                {errors.currentCollege && (
                  <p className="text-sm text-destructive">
                    {errors.currentCollege}
                  </p>
                )}
              </div>

              {/* State & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <Label>State *</Label>
                  <Select
                    value={formData.state}
                    onValueChange={(v) =>
                      handleChange("state", v)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.state && (
                    <p className="text-sm text-destructive">
                      {errors.state}
                    </p>
                  )}
                </div>

                <div>
                  <Label>City *</Label>
                  <Select
                    value={formData.city}
                    disabled={!formData.state}
                    onValueChange={(v) =>
                      handleChange("city", v)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCities.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.city && (
                    <p className="text-sm text-destructive">
                      {errors.city}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    handleChange("email", e.target.value)
                  }
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
             <div>
  <Label>Phone *</Label>

  <div className="flex items-center mt-1">
    {/* +91 Prefix */}
    <div className="px-3 py-2 bg-muted border border-r-0 rounded-l-md text-sm">
      +91
    </div>

    {/* Phone Input */}
    <Input
      type="tel"
      value={formData.phone}
      onChange={(e) =>
        handleChange(
          "phone",
          e.target.value.replace(/\D/g, "").slice(0, 10)
        )
      }
      className="rounded-l-none"
      placeholder="Enter 10-digit number"
    />
  </div>

  {errors.phone && (
    <p className="text-sm text-destructive mt-1">
      {errors.phone}
    </p>
  )}
</div>


              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Proceed to Instructions"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
