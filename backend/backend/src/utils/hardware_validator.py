"""
Utility functions for validating hardware specifications
"""

from typing import Dict, List, Optional


def validate_gpu_spec(gpu_model: str) -> bool:
    """
    Validate if the GPU model meets minimum requirements
    """
    valid_gpus = [
        "RTX 4070 Ti",
        "RTX 4080",
        "RTX 4090",
        "RTX 3090",
        "RTX 3080",
        "RTX 3070",
        "Quadro RTX 6000",
        "Tesla V100",
        "Tesla T4"
    ]

    # Check if the gpu_model contains any of the valid models
    for valid_gpu in valid_gpus:
        if valid_gpu.lower() in gpu_model.lower():
            return True

    return False


def validate_jetson_kit(jetson_model: str) -> bool:
    """
    Validate if the Jetson kit model is supported
    """
    valid_jetson_kits = [
        "Jetson Orin Nano",
        "Jetson Orin NX",
        "Jetson AGX Orin",
        "Jetson Xavier NX",
        "Jetson TX2",
        "Jetson Nano"
    ]

    for valid_kit in valid_jetson_kits:
        if valid_kit.lower() in jetson_model.lower():
            return True

    return False


def validate_hardware_requirements(hardware_specs: Dict) -> List[str]:
    """
    Validate the overall hardware requirements and return a list of issues
    """
    issues = []

    # Validate GPU if specified
    if 'workstation_gpu' in hardware_specs:
        gpu_valid = validate_gpu_spec(hardware_specs['workstation_gpu'])
        if not gpu_valid:
            issues.append("GPU does not meet minimum requirements. Recommended: RTX 4070 Ti or better.")

    # Validate Jetson kit if specified
    if 'edge_kit_type' in hardware_specs:
        jetson_valid = validate_jetson_kit(hardware_specs['edge_kit_type'])
        if not jetson_valid:
            issues.append("Jetson kit model is not supported. Recommended: Jetson Orin Nano or NX.")

    # Validate RAM if specified
    if 'workstation_specs' in hardware_specs and isinstance(hardware_specs['workstation_specs'], dict):
        if 'ram' in hardware_specs['workstation_specs']:
            ram_value = hardware_specs['workstation_specs']['ram']
            # Extract numeric value from string like "32GB"
            import re
            ram_match = re.search(r'(\d+)', str(ram_value))
            if ram_match:
                ram_gb = int(ram_match.group(1))
                if ram_gb < 16:
                    issues.append("RAM is below minimum requirement. Recommended: 32GB or more.")

    return issues


def get_recommended_hardware(user_profile: Dict) -> Dict:
    """
    Get recommended hardware based on user profile and intended use
    """
    recommendations = {}

    # If user is a beginner, recommend entry-level but sufficient hardware
    if user_profile.get('hardware_background') == 'beginner':
        recommendations['gpu'] = 'RTX 4070 Ti or better'
        recommendations['ram'] = '32GB or more'
        recommendations['storage'] = '1TB SSD or more'
    elif user_profile.get('hardware_background') == 'intermediate':
        recommendations['gpu'] = 'RTX 4080 or RTX 4090'
        recommendations['ram'] = '32GB or more'
        recommendations['storage'] = '1TB+ NVMe SSD'
    else:  # Advanced
        recommendations['gpu'] = 'RTX 4090 or professional GPU'
        recommendations['ram'] = '64GB or more'
        recommendations['storage'] = 'High-speed NVMe SSD array'

    # Recommend appropriate Jetson kit based on user's project goals
    if user_profile.get('project_goals') and 'simulation' in user_profile['project_goals']:
        recommendations['jetson_kit'] = 'Jetson Orin Nano (for development)'
    else:
        recommendations['jetson_kit'] = 'Jetson Orin NX or AGX Orin (for production)'

    return recommendations