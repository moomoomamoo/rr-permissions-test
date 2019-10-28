import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { MatSelectChange } from '@angular/material/select';
import { FormControl, FormGroup } from '@angular/forms';

export interface Location {
    text: string;
    groups: string[];
}

export interface Network {
    text: string;
    locations: Location[];
}

export interface System {
    networks: Network[];
}

export interface ClassMap {
    network?: Network;

    networkProfile?: string;
    location?: Location;

    locationProfile?: string;
    survey?: string;
    category?: string;
    group?: string;

    // subject?: string;

    alertee?: string;
    rounder?: string;
}

export interface Profile {
    isSystemProfile: boolean;
    isNetworkProfile: boolean;
    isLocationProfile: boolean;

    text: string;
}

export interface SystemProfile extends Profile {
    canCUDSystemProfiles: boolean;
    canCUNetworksAndBelow: boolean;
    canDNetworksAndBelow: boolean;
    canRBelowNetworks: boolean;
    canRLocationsAndPricing: boolean;
    canCULocationPricing: boolean;

    canRRounds: boolean;
    canCRounds: boolean;
    canURounds: boolean;

    isSystemProfile: true;
    isNetworkProfile: false;
    isLocationProfile: false;
}

export interface NetworkProfile extends Profile {
    network: string;

    canUpdateNetwork: boolean;
    canDisableNetwork: boolean;
    canCUDNetworkProfiles: boolean;
    canCUDLocationsAndBelow: boolean;

    canRRounds: boolean;
    canCRounds: boolean;
    canURounds: boolean;

    isSystemProfile: false;
    isNetworkProfile: true;
    isLocationProfile: false;
}

export interface LocationProfile extends Profile {
    network: string;
    location: string;

    assignedGroups: string[];

    canULocation: boolean;
    canCUDLocationProfiles: boolean;
    canCUDLocationProfilesWithAnyPermissions: boolean;// Allow creating location profile with any permissions (instead of being limited to equal or less)
    canCUDSurveysGroupsCategories: boolean;
    canCUDSubjects: boolean;
    canCUDSubjectsFromAssignedGroups: boolean;

    canRURoundsWhenAlerted: boolean;
    canRURoundsWhenRounder: boolean;
    canRURounds: boolean;
    canRURoundsFromAssignedGroups: boolean;

    canCRounds: boolean;
    canCRoundsFromAssignedGroups: boolean;

    isSystemProfile: false;
    isNetworkProfile: false;
    isLocationProfile: true;
}

// SystemProfile

function canReadSystemProfile(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        return true;
    }

    return false;
}

function canCreateSystemProfile(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUDSystemProfiles;
    }

    return false;
}

function canUpdateSystemProfile(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUDSystemProfiles;
    }

    return false;
}

function canDeleteSystemProfile(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUDSystemProfiles;
    }

    return false;
}

// END SystemProfile


// Network

function canReadNetwork(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        return true;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return true;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network) {
            return true;
        }
    }

    return false;
}

function canCreateNetwork(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return 'skip';
        }

        return false;
    }

    return false;
}

function canUpdateNetwork(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canUpdateNetwork;
        }

        return false;
    }

    return false;
}

function canDisableNetwork(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canDisableNetwork;
        }

        return false;
    }

    return false;
}

function canActivateNetwork(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    return false;
}

function canDeleteNetwork(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canDNetworksAndBelow;
    }

    return false;
}

// END Network

// Network Address

function canReadNetworkAddress(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        return true;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return true;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network) {
            return true;
        }

        return false;
    }

    return false;
}

function canCreateNetworkAddress(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return 'skip';
        }

        return false;
    }

    return false;
}

function canUpdateNetworkAddress(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canUpdateNetwork;
        }

        return false;
    }

    return false;
}
// END Network Address

// Network Notes

function canReadNetworkNotes(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        return true;
    }

    return false;
}

function canCreateNetworkNotes(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    return false;
}

function canUpdateNetworkNotes(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    return false;
}
// END Network Notes


// NetworkProfile

function canReadNetworkProfile(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canRBelowNetworks;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return true;
        }

        return false;
    }

    return false;
}

function canCreateNetworkProfile(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDNetworkProfiles;
        }

        return false;
    }

    return false;
}

function canUpdateNetworkProfile(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDNetworkProfiles;
        }

        return false;
    }

    return false;
}

function canDisableNetworkProfile(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDNetworkProfiles;
        }

        return false;
    }

    return false;
}

function canActivateNetworkProfile(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDNetworkProfiles;
        }

        return false;
    }

    return false;
}

function canDeleteNetworkProfile(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canDNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDNetworkProfiles;
        }

        return false;
    }

    return false;
}

// END NetworkProfile


// Location

function canReadLocation(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canRBelowNetworks || systemProfile.canRLocationsAndPricing;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return true;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return true;
        }

        return false;
    }

    return false;
}

function canCreateLocation(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDLocationsAndBelow;
        }

        return false;
    }

    return false;
}

function canUpdateLocation(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDLocationsAndBelow;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return locationProfile.canULocation;
        }
    }

    return false;
}

function canDisableLocation(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDLocationsAndBelow;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return locationProfile.canULocation;
        }
    }

    return false;
}

function canActivateLocation(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return 'skip';
        }

        return false;
    }

    return false;
}

function canDeleteLocation(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canDNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDLocationsAndBelow;
        }

        return false;
    }

    return false;
}

// END Location


// Location Billing

function canReadLocationBilling(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canRLocationsAndPricing;
    }

    return false;
}

function canCreateLocationBilling(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCULocationPricing;
    }

    return false;
}

function canUpdateLocationBilling(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCULocationPricing;
    }

    return false;
}

// END Location Billing


// Location Address

function canReadLocationAddress(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canRLocationsAndPricing;
    }

    return false;
}

function canCreateLocationAddress(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCULocationPricing;
    }

    return false;
}

function canUpdateLocationAddress(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCULocationPricing;
    }

    return false;
}

// END Location Address


// Location Notes

function canReadLocationNotes(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canRBelowNetworks || systemProfile.canRLocationsAndPricing;
    }

    return false;
}

function canCreateLocationNotes(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    return false;
}

function canUpdateLocationNotes(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    return false;
}

// END Location Notes


// LocationProfile

function canReadLocationProfile(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canRBelowNetworks;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return true;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return true;
        }

        return false;
    }

    return false;
}

function canCreateLocationProfile(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDLocationsAndBelow;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return locationProfile.canCUDLocationProfiles || locationProfile.canCUDLocationProfilesWithAnyPermissions;
        }
    }

    return false;
}

function canUpdateLocationProfile(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDLocationsAndBelow;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return locationProfile.canCUDLocationProfiles || locationProfile.canCUDLocationProfilesWithAnyPermissions;
        }
    }

    return false;
}

function canDisableLocationProfile(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDLocationsAndBelow;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return locationProfile.canCUDLocationProfiles || locationProfile.canCUDLocationProfilesWithAnyPermissions;
        }
    }

    return false;
}

function canActivateLocationProfile(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }
    
    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDLocationsAndBelow;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return locationProfile.canCUDLocationProfiles || locationProfile.canCUDLocationProfilesWithAnyPermissions;
        }
    }

    return false;
}

function canDeleteLocationProfile(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canDNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDLocationsAndBelow;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return locationProfile.canCUDLocationProfiles || locationProfile.canCUDLocationProfilesWithAnyPermissions;
        }
    }

    return false;
}

// END LocationProfile


// Survey

function canReadSurvey(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canRBelowNetworks;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return true;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return true;
        }

        return false;
    }

    return false;
}

function canCreateSurvey(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDLocationsAndBelow;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return locationProfile.canCUDSurveysGroupsCategories;
        }
    }

    return false;
}

function canUpdateSurvey(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDLocationsAndBelow;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return locationProfile.canCUDSurveysGroupsCategories;
        }
    }

    return false;
}

function canDisableSurvey(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDLocationsAndBelow;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return locationProfile.canCUDSurveysGroupsCategories;
        }
    }

    return false;
}

function canActivateSurvey(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }
    
    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDLocationsAndBelow;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return locationProfile.canCUDSurveysGroupsCategories;
        }
    }

    return false;
}

function canDeleteSurvey(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canDNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDLocationsAndBelow;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return locationProfile.canCUDSurveysGroupsCategories;
        }
    }

    return false;
}

// END Survey



// Category

function canReadCategory(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canRBelowNetworks;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return true;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return true;
        }

        return false;
    }

    return false;
}

function canCreateCategory(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDLocationsAndBelow;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return locationProfile.canCUDSurveysGroupsCategories;
        }
    }

    return false;
}

function canUpdateCategory(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDLocationsAndBelow;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return locationProfile.canCUDSurveysGroupsCategories;
        }
    }

    return false;
}

function canDeleteCategory(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canDNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDLocationsAndBelow;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return locationProfile.canCUDSurveysGroupsCategories;
        }
    }

    return false;
}

// END Category


// Group

function canReadGroup(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canRBelowNetworks;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return true;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return true;
        }

        return false;
    }

    return false;
}

function canCreateGroup(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDLocationsAndBelow;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return locationProfile.canCUDSurveysGroupsCategories;
        }
    }

    return false;
}

function canUpdateGroup(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDLocationsAndBelow;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return locationProfile.canCUDSurveysGroupsCategories;
        }
    }

    return false;
}

function canDisableGroup(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDLocationsAndBelow;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return locationProfile.canCUDSurveysGroupsCategories;
        }
    }

    return false;
}

function canActivateGroup(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }
    
    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDLocationsAndBelow;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return locationProfile.canCUDSurveysGroupsCategories;
        }
    }

    return false;
}

function canDeleteGroup(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canDNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDLocationsAndBelow;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return locationProfile.canCUDSurveysGroupsCategories;
        }
    }

    return false;
}

// END Group


// Subject

function canReadSubject(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canRBelowNetworks;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return true;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return true;
        }

        return false;
    }

    return false;
}

function canCreateSubject(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDLocationsAndBelow;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return locationProfile.canCUDSubjects || locationProfile.canCUDSubjectsFromAssignedGroups && stringIsInArray(locationProfile.assignedGroups, classMap.group);
        }
    }

    return false;
}

function canUpdateSubject(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCUNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDLocationsAndBelow;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return locationProfile.canCUDSubjects || locationProfile.canCUDSubjectsFromAssignedGroups && stringIsInArray(locationProfile.assignedGroups, classMap.group);
        }
    }

    return false;
}

function canDeleteSubject(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canDNetworksAndBelow;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCUDLocationsAndBelow;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            return locationProfile.canCUDSubjects || locationProfile.canCUDSubjectsFromAssignedGroups && stringIsInArray(locationProfile.assignedGroups, classMap.group);
        }
    }

    return false;
}

// END Subject


// Round

function canReadRound(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canRRounds || 'skip';
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canRRounds || 'skip';
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            const a = locationProfile.canRURounds;
            const b = locationProfile.canRURoundsFromAssignedGroups && stringIsInArray(locationProfile.assignedGroups, classMap.group);
            const c = locationProfile.canRURoundsWhenRounder && classMap.rounder === locationProfile.text;
            const d = locationProfile.canRURoundsWhenAlerted && classMap.alertee === locationProfile.text;
            return a || b || c || d || 'skip';
        }

        return false;
    }

    return false;
}

function canCreateRound(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canCRounds || 'skip';
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canCRounds || 'skip';
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            const a = locationProfile.canCRounds;
            const b = locationProfile.canCRoundsFromAssignedGroups && stringIsInArray(locationProfile.assignedGroups, classMap.group);
            return a || b || 'skip';
        }

        return false;
    }

    return false;
}

function canUpdateRound(profile: Profile, classMap: ClassMap) {
    if (profile.isSystemProfile) {
        const systemProfile = profile as SystemProfile;
        return systemProfile.canURounds;
    }

    if (profile.isNetworkProfile) {
        const networkProfile = profile as NetworkProfile;
        if (classMap.network && classMap.network.text === networkProfile.network) {
            return networkProfile.canURounds;
        }

        return false;
    }

    if (profile.isLocationProfile) {
        const locationProfile = profile as LocationProfile;
        if (classMap.network && classMap.network.text === locationProfile.network && classMap.location && classMap.location.text === locationProfile.location) {
            const a = locationProfile.canRURounds;
            const b = locationProfile.canRURoundsFromAssignedGroups && stringIsInArray(locationProfile.assignedGroups, classMap.group);
            const c = locationProfile.canRURoundsWhenRounder && classMap.rounder === locationProfile.text;
            const d = locationProfile.canRURoundsWhenAlerted && classMap.alertee === locationProfile.text;
            return a || b || c || d;
        }
    }

    return false;
}

// END Subject


// Helpers

function stringIsInArray(ary: string[], str: string) {
    if (!ary || !str) {
        return false;
    }

    if (ary.includes(str)) {
        return true;
    }

    return false;
}

// END Helpers

export type Action = "Read" | "Create" | "Update" | "Disable" | "Activate" | "Delete";
export type Actable = 'System Profile' | 'Network' | 'Network Address' | 'Network Notes' | 'Network Profile' | 'Location' | 'Location Billing' | 'Location Address' | 'Location Notes' | 'Location Profile' | 'Survey' | 'Category' | 'Group' | 'Subject' | 'Round';

export type PermissionValidation = ((profile: Profile, classMap: ClassMap) => boolean | 'skip') | 'skip';

export class PermissionShallowValidation {
    dependancy: Action;

    constructor(public validator: PermissionValidation, public action: Action) {
        const dependancies: Action[] = [
            'Read', 'Create', 'Update', 'Disable', 'Activate', 'Delete'
        ];

        for (let i = 0; i < dependancies.length; i++) {
            const dependancy = dependancies[i];

            if (dependancy === action) {
                this.dependancy = dependancies[i - 1];
            }
        }
    }
}

export class ReadPermission extends PermissionShallowValidation {
    constructor(validator: PermissionValidation) {
        super(validator, 'Read');
    }
}

export class CreatePermission extends PermissionShallowValidation {
    constructor(validator: PermissionValidation) {
        super(validator, 'Create');
    }
}

export class UpdatePermission extends PermissionShallowValidation {
    constructor(validator: PermissionValidation) {
        super(validator, 'Update');
    }
}

export class DisablePermission extends PermissionShallowValidation {
    constructor(validator: PermissionValidation) {
        super(validator, 'Disable');
    }
}

export class ActivatePermission extends PermissionShallowValidation {
    constructor(validator: PermissionValidation) {
        super(validator, 'Activate');
    }
}

export class DeletePermission extends PermissionShallowValidation {
    constructor(validator: PermissionValidation) {
        super(validator, 'Delete');
    }
}

export type ActionMap = {
    [action in Action]: PermissionShallowValidation;
};

export class ShallowActionMap implements ActionMap {
    // actable: Actable;
    // 'Read': ReadPermission;
    // 'Create': CreatePermission;
    // 'Update': UpdatePermission;
    // 'Disable': DisablePermission;
    // 'Activate': ActivatePermission;
    // 'Delete': DeletePermission;

    constructor(public actable: Actable, public Read: ReadPermission, public Create: CreatePermission, public Update: UpdatePermission, public Disable: DisablePermission, public Activate: ActivatePermission, public Delete: DeletePermission) {

    }

    canDoAction(action: Action, profile: Profile, classMap: ClassMap): string {
        const dependancies: Action[] = [
            'Read', 'Create', 'Update', 'Disable', 'Activate', 'Delete'
        ];

        for (let dependancy of dependancies) {
            const dependancyCheck = this[dependancy];

            const dependancyCheckValue = dependancyCheck.validator === 'skip' ? 'skip' : dependancyCheck.validator(profile, classMap);

            if (dependancyCheckValue === true && dependancy === action) {
                return 'TRUE';
            } else if (dependancyCheckValue !== false && dependancy !== action) {
                continue; // passes shallow
            } else if (dependancyCheckValue === 'skip' && dependancy === action) {
                return 'SKIP';
            } else if (dependancyCheckValue === false) {

                // These should be 'FALSE' but to match the style of the sheets, let's just mark them as skip
                if (this.actable === 'System Profile' || this.actable === 'Category' || this.actable === 'Subject') {
                    if (action === 'Disable' || action === 'Activate') {
                        return 'SKIP';
                    }
                } else if (this.actable === 'Network Address' || this.actable === 'Network Notes' || this.actable === 'Location Billing' || this.actable === 'Location Address' || this.actable === 'Location Notes' || this.actable === 'Round') {
                    if (action === 'Disable' || action === 'Activate' || action === 'Delete') {
                        return 'SKIP';
                    }
                }

                return 'FALSE';
            }
        }
    }
}

export type PermissionsTable = {
    [actable in Actable]: ShallowActionMap;
}

export type PermissionType = "System Profile" | "Network Profile" | "Location Profile";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    title = 'rr-permissions-test';

    system: System;

    permissionTable: PermissionsTable;

    systemProfile: SystemProfile;
    networkProfile: NetworkProfile;
    locationProfile: LocationProfile;

    actions: Action[] = ["Read", "Create", "Update", "Disable", "Activate", "Delete"];
    actables: Actable[] = ["System Profile", "Network", "Network Address", "Network Notes", "Network Profile", "Location", "Location Billing", "Location Address", "Location Notes", "Location Profile", "Survey", "Category", "Group", "Subject", "Round"]

    profileTypes: PermissionType[] = ["System Profile", "Network Profile", "Location Profile"];

    profileType: PermissionType;

    profile: Profile;

    classMap: ClassMap;

    network: Network;
    location: Location;

    profileTexts = ["Sean", "Nicole", "Mark"];

    formGroup = new FormGroup({
        network: new FormControl(''),
        location: new FormControl(''),
        group: new FormControl(''),
        rounder: new FormControl(''),
        alertee: new FormControl(''),
        //
        networkProfileName: new FormControl(''),
        locationProfileName: new FormControl(''),
    });

    systemProfileFormGroup = new FormGroup({
        systemProfileName: new FormControl(''),
    });
    
    networkProfileFormGroup = new FormGroup({
        networkProfileName: new FormControl(''),
        networkProfileNetwork: new FormControl(''),
    });
    
    locationProfileFormGroup = new FormGroup({
        locationProfileName: new FormControl(''),
        locationProfileNetwork: new FormControl(''),
        locationProfileLocation: new FormControl(''),
    });

    constructor() {

    }

    ngOnInit() {
        this.system = {
            networks: []
        };

        const network1: Network = {
            text: 'Sports',
            locations: [],
        };

        const location1a: Location = {
            text: 'Baseball',
            groups: [
                'Little League',
                'Major League'
            ]
        };

        const location1b: Location = {
            text: 'Chess',
            groups: [
                'Sub 1400',
                'Sub 2500',
                'Grand Masters'
            ]
        };

        network1.locations.push(location1a);
        network1.locations.push(location1b);

        this.system.networks.push(network1);

        const network2: Network = {
            text: 'Music',
            locations: [],
        };

        const location2a: Location = {
            text: 'Eminem',
            groups: [
                'As the World Turns',
                'All I think About'
            ]
        };

        const location2b: Location = {
            text: 'Billie Eilish',
            groups: [
                'Bad Guy',
                "When the Party's Over",
                'Stomach Ache'
            ]
        };

        network2.locations.push(location2a);
        network2.locations.push(location2b);

        this.system.networks.push(network2);

        this.classMap = {
            network: null,
            location: null,
            group: null,
            rounder: null,
            alertee: null
        };

        this.systemProfile = {
            text: 'Sean',
            canCUDSystemProfiles: true,
            canCUNetworksAndBelow: true,
            canDNetworksAndBelow: true,
            canRBelowNetworks: true,
            canCULocationPricing: true,
            canRLocationsAndPricing: true,
            canRRounds: true,
            canCRounds: true,
            canURounds: true,
            isSystemProfile: true,
            isNetworkProfile: false,
            isLocationProfile: false
        };

        this.systemProfileFormGroup.controls.systemProfileName.setValue('Sean');
        this.networkProfileFormGroup.controls.networkProfileName.setValue('Nicole');
        this.locationProfileFormGroup.controls.locationProfileName.setValue('Mark');

        this.networkProfile = {
            network: "Music",
            text: 'Nicole',
            canCUDLocationsAndBelow: true,
            canCUDNetworkProfiles: true,
            canDisableNetwork: true,
            canUpdateNetwork: true,
            canRRounds: true,
            canCRounds: true,
            canURounds: true,
            isSystemProfile: false,
            isNetworkProfile: true,
            isLocationProfile: false
        };
        
        this.locationProfile = {
            network: "Sports",
            location: "Chess",

            text: 'Mark',
                    
            assignedGroups: ['Sub 1400'],

            canULocation: true,
            canCUDLocationProfiles: true,
            canCUDLocationProfilesWithAnyPermissions: true,
            canCUDSurveysGroupsCategories: true,
            canCUDSubjects: true,
            canCUDSubjectsFromAssignedGroups: true,

            canRURoundsWhenAlerted: true,
            canRURoundsWhenRounder: true,
            canRURounds: true,
            canRURoundsFromAssignedGroups: true,

            canCRounds: true,
            canCRoundsFromAssignedGroups: true,

            isSystemProfile: false,
            isNetworkProfile: false,
            isLocationProfile: true,
        };

        this.profileType = "System Profile";
        this.profile = this.systemProfile;
        
        this.permissionTable = {
            'System Profile': new ShallowActionMap('System Profile',
                new ReadPermission(canReadSystemProfile),
                new CreatePermission(canCreateSystemProfile),
                new UpdatePermission(canUpdateSystemProfile),
                new DisablePermission('skip'),
                new ActivatePermission('skip'),
                new DeletePermission(canDeleteSystemProfile)
            ),
            'Network': new ShallowActionMap('Network',
                new ReadPermission(canReadNetwork),
                new CreatePermission(canCreateNetwork),
                new UpdatePermission(canUpdateNetwork),
                new DisablePermission(canDisableNetwork),
                new ActivatePermission(canActivateNetwork),
                new DeletePermission(canDeleteNetwork)
            ),
            'Network Address': new ShallowActionMap('Network Address',
                new ReadPermission(canReadNetworkAddress),
                new CreatePermission(canCreateNetworkAddress),
                new UpdatePermission(canUpdateNetworkAddress),
                new DisablePermission('skip'),
                new ActivatePermission('skip'),
                new DeletePermission('skip')
            ),
            'Network Notes': new ShallowActionMap('Network Notes',
                new ReadPermission(canReadNetworkNotes),
                new CreatePermission(canCreateNetworkNotes),
                new UpdatePermission(canUpdateNetworkNotes),
                new DisablePermission('skip'),
                new ActivatePermission('skip'),
                new DeletePermission('skip')
            ),
            'Network Profile': new ShallowActionMap('Network Profile',
                new ReadPermission(canReadNetworkProfile),
                new CreatePermission(canCreateNetworkProfile),
                new UpdatePermission(canUpdateNetworkProfile),
                new DisablePermission(canDisableNetworkProfile),
                new ActivatePermission(canActivateNetworkProfile),
                new DeletePermission(canDeleteNetworkProfile)
            ),
            'Location': new ShallowActionMap('Location',
                new ReadPermission(canReadLocation),
                new CreatePermission(canCreateLocation),
                new UpdatePermission(canUpdateLocation),
                new DisablePermission(canDisableLocation),
                new ActivatePermission(canActivateLocation),
                new DeletePermission(canDeleteLocation)
            ),
            'Location Billing': new ShallowActionMap('Location Billing',
                new ReadPermission(canReadLocationBilling),
                new CreatePermission(canCreateLocationBilling),
                new UpdatePermission(canUpdateLocationBilling),
                new DisablePermission('skip'),
                new ActivatePermission('skip'),
                new DeletePermission('skip')
            ),
            'Location Address': new ShallowActionMap('Location Address',
                new ReadPermission(canReadLocationAddress),
                new CreatePermission(canCreateLocationAddress),
                new UpdatePermission(canUpdateLocationAddress),
                new DisablePermission('skip'),
                new ActivatePermission('skip'),
                new DeletePermission('skip')
            ),
            'Location Notes': new ShallowActionMap('Location Notes',
                new ReadPermission(canReadLocationNotes),
                new CreatePermission(canCreateLocationNotes),
                new UpdatePermission(canUpdateLocationNotes),
                new DisablePermission('skip'),
                new ActivatePermission('skip'),
                new DeletePermission('skip')
            ),
            'Location Profile': new ShallowActionMap('Location Profile',
                new ReadPermission(canReadLocationProfile),
                new CreatePermission(canCreateLocationProfile),
                new UpdatePermission(canUpdateLocationProfile),
                new DisablePermission(canDisableLocationProfile),
                new ActivatePermission(canActivateLocationProfile),
                new DeletePermission(canDeleteLocationProfile)
            ),
            'Survey': new ShallowActionMap('Survey',
                new ReadPermission(canReadSurvey),
                new CreatePermission(canCreateSurvey),
                new UpdatePermission(canUpdateSurvey),
                new DisablePermission(canDisableSurvey),
                new ActivatePermission(canActivateSurvey),
                new DeletePermission(canDeleteSurvey)
            ),
            'Category': new ShallowActionMap('Category',
                new ReadPermission(canReadCategory),
                new CreatePermission(canCreateCategory),
                new UpdatePermission(canUpdateCategory),
                new DisablePermission('skip'),
                new ActivatePermission('skip'),
                new DeletePermission(canDeleteCategory)
            ),
            'Group': new ShallowActionMap('Group',
                new ReadPermission(canReadGroup),
                new CreatePermission(canCreateGroup),
                new UpdatePermission(canUpdateGroup),
                new DisablePermission(canDisableGroup),
                new ActivatePermission(canActivateGroup),
                new DeletePermission(canDeleteGroup)
            ),
            'Subject': new ShallowActionMap('Subject',
                new ReadPermission(canReadSubject),
                new CreatePermission(canCreateSubject),
                new UpdatePermission(canUpdateSubject),
                new DisablePermission('skip'),
                new ActivatePermission('skip'),
                new DeletePermission(canDeleteSubject)
            ),
            'Round': new ShallowActionMap('Round',
                new ReadPermission(canReadRound),
                new CreatePermission(canCreateRound),
                new UpdatePermission(canUpdateRound),
                new DisablePermission('skip'),
                new ActivatePermission('skip'),
                new DeletePermission('skip')
            ),
        }
    }

    setProfileType(event: MatRadioChange) {
        const profileType: PermissionType = event.value;
        if (profileType === 'System Profile') {
            this.profile = this.systemProfile;
        } else if (profileType === 'Network Profile') {
            this.profile = this.networkProfile;
        } else if (profileType === 'Location Profile') {
            this.profile = this.locationProfile;
        }

        this.profileType = profileType;
    }

    updateNetwork(event: MatSelectChange) {
        console.log(event);
        const network: Network = event.value;

        if (this.classMap.network === network) {
            return;
        }

        this.classMap.network = network;

        this.formGroup.controls.network && this.formGroup.controls.network.setValue(network);

        this.classMap.location = null;

        this.formGroup.controls.location && this.formGroup.controls.location.setValue(null);

        this.classMap.group = null;

        this.formGroup.controls.group && this.formGroup.controls.group.setValue(null);
    }
    
    updateLocation(event: MatSelectChange) {
        console.log(event);
        const location: Location = event.value;

        if (this.classMap.location === location) {
            return;
        }

        this.classMap.location = location;

        this.formGroup.controls.location && this.formGroup.controls.location.setValue(location);

        this.classMap.group = null;

        this.formGroup.controls.group && this.formGroup.controls.group.setValue(null);
    }
     
    updateGroup(event: MatSelectChange) {
        console.log(event);
        const group: string = event.value;

        if (this.classMap.group === group) {
            return;
        }

        this.classMap.group = group;

        this.formGroup.controls.group && this.formGroup.controls.group.setValue(group);
    }
         
    updateRounder(event: MatSelectChange) {
        console.log(event);
        const rounder: string = event.value;

        if (this.classMap.rounder === rounder) {
            return;
        }

        this.classMap.rounder = rounder;

        this.formGroup.controls.rounder && this.formGroup.controls.rounder.setValue(rounder);
    }
             
    updateAlertee(event: MatSelectChange) {
        console.log(event);
        const alertee: string = event.value;

        if (this.classMap.alertee === alertee) {
            return;
        }

        this.classMap.alertee = alertee;

        this.formGroup.controls.alertee && this.formGroup.controls.alertee.setValue(alertee);
    }

    //
       
    updateSystemProfileName(event: MatSelectChange) {
        console.log(event);
        const name: string = event.value;

        if (this.systemProfile.text === name) {
            return;
        }

        this.systemProfile.text = name;

        this.formGroup.controls.systemProfileName && this.formGroup.controls.systemProfileName.setValue(name);
    }
    
    updateNetworkProfileName(event: MatSelectChange) {
        console.log(event);
        const name: string = event.value;

        if (this.networkProfile.text === name) {
            return;
        }

        this.networkProfile.text = name;

        this.formGroup.controls.networkProfileName && this.formGroup.controls.networkProfileName.setValue(name);
    }
    
    updateLocationProfileName(event: MatSelectChange) {
        console.log(event);
        const name: string = event.value;

        if (this.locationProfile.text === name) {
            return;
        }

        this.locationProfile.text = name;

        this.formGroup.controls.locationProfileName && this.formGroup.controls.locationProfileName.setValue(name);
    }
}
