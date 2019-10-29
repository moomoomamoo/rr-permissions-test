import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { MatSelectChange } from '@angular/material/select';
import { FormControl, FormGroup } from '@angular/forms';

import { Profile, SystemProfile, NetworkProfile, LocationProfile, Network, Location, Group, Action, Actable, PermissionsTable, PermissionWizard, ClassMap } from '@moomoomamoo/rocket-rounding-types';

export class TestLocation extends Location {
    groups: Group[] = [];
}

export class TestNetwork extends Network {
    locations: TestLocation[] = [];
}

export class TestSystem {
    networks: TestNetwork[] = [];
}

export type PermissionType = "System Profile" | "Network Profile" | "Location Profile";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    title = 'rr-permissions-test';

    system: TestSystem;

    permissionWizard: PermissionWizard;
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

    network: TestNetwork;
    location: TestLocation;

    profiles = [];

    formGroup = new FormGroup({
        network: new FormControl(''),
        location: new FormControl(''),
        group: new FormControl(''),
        rounder: new FormControl(''),
        alertee: new FormControl(''),
        //
        networkProfile: new FormControl(''),
        locationProfile: new FormControl(''),
    });

    systemProfileFormGroup = new FormGroup({
        systemProfile: new FormControl(''),
    });
    
    networkProfileFormGroup = new FormGroup({
        networkProfile: new FormControl(''),
        networkProfileNetwork: new FormControl(''),
    });
    
    locationProfileFormGroup = new FormGroup({
        locationProfile: new FormControl(''),
        locationProfileNetwork: new FormControl(''),
        locationProfileLocation: new FormControl(''),
    });

    constructor() {

    }

    ngOnInit() {
        this.system = {
            networks: []
        };

        // Sports
        const network1: TestNetwork = new TestNetwork('sports', 'Sports');
        this.system.networks.push(network1);

        const location1a: TestLocation = new TestLocation('baseball', 'sports', 'Baseball');//{
        network1.locations.push(location1a);

        const group1a1 = new Group('little-league', 'sports', 'baseball', 'Little League');
        location1a.groups.push(group1a1);

        const group1a2 = new Group('major-league', 'sports', 'baseball', 'Major League');
        location1a.groups.push(group1a2);

        const location1b: TestLocation = new TestLocation('chess', 'sports', 'Chess');
        network1.locations.push(location1b);

        const group1b1 = new Group('sub-1400', 'sports', 'baseball', 'Sub 1400');
        location1b.groups.push(group1b1);

        const group1b2 = new Group('sub-2500', 'sports', 'baseball', 'Sub 2500');
        location1b.groups.push(group1b2);

        const group1b3 = new Group('grand-masters', 'sports', 'baseball', 'Grand Masters');
        location1b.groups.push(group1b3);

        // END Sports

        // Music
        const network2: TestNetwork = new TestNetwork('music', 'Music');
        this.system.networks.push(network2);

        const location2a: TestLocation = new TestLocation('eminem', 'music', 'Eminem');
        network2.locations.push(location2a);

        const group2a1 = new Group('as-the-world-turns', 'music', 'eminem', 'As the World Turns');
        location2a.groups.push(group2a1);

        const group2a2 = new Group('all-i-think-about', 'music', 'eminem', 'All I think About');
        location2a.groups.push(group2a2);

        const location2b: TestLocation = new TestLocation('billie-eilish', 'music', 'Billie Eilish');
        network2.locations.push(location2b);

        const group2b1 = new Group('bad-guy', 'music', 'billie-eilish', 'Bad Guy');
        location2b.groups.push(group2b1);

        const group2b2 = new Group('when-the-partys-over', 'music', 'billie-eilish', 'When the Party\'s Over');
        location2b.groups.push(group2b2);

        const group2b3 = new Group('stomach-ache', 'music', 'billie-eilish', 'Stomach Ache');
        location2b.groups.push(group2b3);
        // END Music

        this.classMap = {
            network: null,
            location: null,
            group: null,
            rounderKey: null,
            alerteeKey: null
        };

        this.systemProfile = new SystemProfile('sean', 'Sean', 'sean@smpl.company', 'systemAdmin');

        this.networkProfile = new NetworkProfile('nicole', 'music', 'Nicole', 'nicole@smpl.company', 'networkAdmin');
        
        this.locationProfile = new LocationProfile('mark', 'sports', 'chess', 'Mark', 'mark.thompson@smpl.company', 'locationAdmin');
        this.locationProfile.assignedGroups = {
            [group1b1.key]: true// Sub 1400
        };

        this.profileType = "System Profile";
        this.profile = this.systemProfile;

        this.profiles.push(this.systemProfile, this.networkProfile, this.locationProfile);

        this.systemProfileFormGroup.controls.systemProfile.setValue(this.systemProfile);
        this.networkProfileFormGroup.controls.networkProfile.setValue(this.networkProfile);
        this.locationProfileFormGroup.controls.locationProfile.setValue(this.locationProfile);
        
        this.permissionWizard = new PermissionWizard(this.getProfile);
        this.permissionTable = this.permissionWizard.permissionTable;
    }

    getProfile(): Profile {
        return this.profile;
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
        const network: TestNetwork = event.value;

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
        const location: TestLocation = event.value;

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
        const group: Group = event.value;

        if (this.classMap.group === group) {
            return;
        }

        this.classMap.group = group;

        this.formGroup.controls.group && this.formGroup.controls.group.setValue(group);
    }
         
    updateRounder(event: MatSelectChange) {
        console.log(event);
        const rounderKey: string = event.value;

        if (this.classMap.rounderKey === rounderKey) {
            return;
        }

        this.classMap.rounderKey = rounderKey;

        this.formGroup.controls.rounder && this.formGroup.controls.rounder.setValue(rounderKey);
    }
             
    updateAlertee(event: MatSelectChange) {
        console.log(event);
        const alerteeKey: string = event.value;

        if (this.classMap.alerteeKey === alerteeKey) {
            return;
        }

        this.classMap.alerteeKey = alerteeKey;

        this.formGroup.controls.alertee && this.formGroup.controls.alertee.setValue(alerteeKey);
    }

    //
       
    updateSystemProfile(event: MatSelectChange) {
        console.log(event);
        const systemProfile: SystemProfile = event.value;

        if (this.systemProfile === systemProfile) {
            return;
        }

        this.systemProfile = systemProfile;

        this.formGroup.controls.systemProfile && this.formGroup.controls.systemProfile.setValue(systemProfile);
    }
    
    updateNetworkProfile(event: MatSelectChange) {
        console.log(event);
        const networkProfile: NetworkProfile = event.value;

        if (this.networkProfile === networkProfile) {
            return;
        }

        this.networkProfile = networkProfile;

        this.formGroup.controls.networkProfile && this.formGroup.controls.networkProfile.setValue(networkProfile);
    }
    
    updateLocationProfile(event: MatSelectChange) {
        console.log(event);
        const locationProfile: LocationProfile = event.value;

        if (this.locationProfile === locationProfile) {
            return;
        }

        this.locationProfile = locationProfile;

        this.formGroup.controls.locationProfile && this.formGroup.controls.locationProfile.setValue(locationProfile);
    }
}
